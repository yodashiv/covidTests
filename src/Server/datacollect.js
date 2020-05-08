// This is where the logic for collecting the data from castlight will reside.
// This module will then use prisma to interact with our database and update it
// with the new data that we will fetch every night.
// Will put this cron job function onto google cloud function.
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cheerio = require('cheerio');
const fetch = require("node-fetch");
const fs = require('fs');
const axios = require('axios');
const {googToken} = require("../constants/tokens");

let states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT',
    'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN',
    'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN',
    'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC',
    'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI',
    'WY' ];

async function populateRegions() {
    for (const state of states) {
        await insertIntoRegions(state);
    }
    console.log("All regions updated");
}

async function insertIntoRegions(state) {
    let counties = await fetchStateCountyPairs(state);
    for (const county of counties) {
        const test = await prisma.regions.create({
            data: {
                state: state,
                county: county
            },
        });
    }
    console.log("Database updated");
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









async function getCountiesOfState(state) {
    let result = await prisma.regions.findMany({
        where: {state: state},
        select: {county: true}
    });
    console.log(result);
    return result;
}

async function getAllTestSites() {
    let stateCountyPairs = await getCountiesOfState();
    let result = [];
    stateCountyPairs.map(
        (pair, index) => {
            result.push(fetchSites(pair.state, pair.county));
        });
    return result;
}

async function fetchSites(state) {
    let counties = await getCountiesOfState(state);
    let result = [];
    for (const county of counties) {
        let url = `https://my.castlighthealth.com/corona-virus-testing-sites/data/result.php?county=${county.county}&state=${state}`;
        let response = await fetch(url);
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
                source: source
            };
            result.push(siteInfo);
        }


        // // let nameMatches = $(".result_box h2");
        // // console.log(nameMatches[1].children[0].data);
        // // break;
        //
        // console.log($("h2").text()); // Gets the name
        // console.log($("img[alt='Icon pin']").next().text()); // gets the address
        // console.log($("img[alt='Icon call']").next().text()); // gets the phone
        // console.log($("a[style='color: #282C37;']").text()); // gets the source
        // console.log("Done with one county");
        // console.log("\n");
        // break;
    }
    console.log(result);
    return result;

}

fetchSites('CA').then(
    (result) => {
        prisma.disconnect();
    }
);

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
