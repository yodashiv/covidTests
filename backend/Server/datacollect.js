const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cheerio = require('cheerio');
const fetch = require("node-fetch");
const fs = require('fs');
const axios = require('axios');
const statePairs = require("../constants/constants");


const googToken = process.env.GOOG_KEY;

let statePairs1 = [
    {
        "name": "Alabama",
        "abbreviation": "AL"
    },
    {
        "name": "Alaska",
        "abbreviation": "AK"
    }
];

async function populateRegions() {
    await prisma.regions.deleteMany({});
    for (const statePair of statePairs) {
        await insertIntoRegions(statePair);
    }
}

async function insertIntoRegions(statePair) {
    let counties = await fetchStateCountyPairs(statePair.abbreviation);
    for (const county of counties) {
        const newRecord = await prisma.regions.create({
            data: {
                stateAbrv: statePair.abbreviation,
                stateFullName: statePair.name,
                county: county
            },
        });
    }
}

async function fetchStateCountyPairs(state) {
    let url = `https://my.castlighthealth.com/corona-virus-testing-sites/data/result.php?state_key=${state}`;
    let result = [];

    let response = await fetch(url);
    let data = await response.text();
    let $ = cheerio.load(data);
    let matches = $("option");
    for (let i = 2; i < matches.length; i++) {
        result.push(matches[i].children[0].data);
    }
    return result;
}

// populateRegions().then(
//     (result) => {
//         prisma.disconnect();
//     }
// );



async function populateTestSites() {
    await prisma.testSites.deleteMany({});
    for (const statePair of statePairs) {
        await insertIntoTestSites(statePair);
    }
}

async function insertIntoTestSites(statePair) {
    let testSitesInState = await fetchSites(statePair.abbreviation);
    for (const testSite of testSitesInState) {
        let geoCodeResult = null;
        try {
            geoCodeResults = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
                    params : {
                        address: testSite.address,
                        key: googToken
                    }
                }
            );
        } catch (err) {
            continue;
        }
        let {lat, lng} = geoCodeResults.data.results[0].geometry.location;
        testSite.lat = lat;
        testSite.lng = lng;
        const newRecord = await prisma.testSites.create({
            data: {
                name: testSite.name,
                address: testSite.address,
                phone: testSite.phone,
                source: testSite.source,
                latitude: testSite.lat,
                longitude: testSite.lng,
                county: testSite.county,
                stateAbrv: statePair.abbreviation,
                stateFullName: statePair.name,
                description: null
            },
        });
    }
}

async function fetchSites(state) {
    let counties = await getCountiesOfState(state);
    let result = [];
    for (const county of counties) {
        let url = `https://my.castlighthealth.com/corona-virus-testing-sites/data/result.php?county=${county.county}&state=${state}`;
        let response = null;
        try {
            response = await fetch(url);
        } catch(err) {
            return result;
        }
        let data = await response.text();
        let $ = cheerio.load(data);

        let matches = $(".result_box");

        for (let i = 0; i < matches.length; i++) {
            let aResultBox = matches.eq(i);
            let name = aResultBox.find("h2")[0].children[0].data;

            let address = null;
            let potAddress = aResultBox.find("img[alt='Icon pin']");
            if (potAddress !== undefined && potAddress.next()[0] !== undefined) {
                address = potAddress.next()[0].children[0].data;
            }

            let phone = null;
            let potPhone = aResultBox.find("img[alt='Icon call']");
            if (potPhone !== undefined && potPhone.next()[0] !== undefined) {
                phone = potPhone.next()[0].children[0].data;
            }

            let source = null;
            let potSource = aResultBox.find("a[style='color: #282C37;']")[0];
            if (potSource !== undefined) {
                source = potSource.children[0].data.trim();
            }

            let siteInfo = {
                name : name,
                address: address,
                phone: phone,
                source: source,
                county: county.county
            };
            result.push(siteInfo);
        }
    }
    return result;

}

async function getCountiesOfState(state) {
    let result = await prisma.regions.findMany({
        where: {stateAbrv: state},
        select: {county: true}
    });
    return result;
}

async function performAll() {
    await populateRegions();
    await populateTestSites();
}

performAll().then(
    (result) => {
        prisma.disconnect();
    }
);

// populateTestSites().then(
//     (result) => {
//         prisma.disconnect();
//     }
// );

// getCountiesOfState('CA').then(
//     (result) => {
//         prisma.disconnect();
//     }
// );

// getAllTestSites().then(
//     (result) => {
//         console.log(result);
//     }
// );

// make sure that we disconnect from our data base once we are done writing to it through prisma client.
