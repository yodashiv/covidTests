const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cheerio = require('cheerio');
const fetch = require("node-fetch");
const fs = require('fs');
const axios = require('axios');


const googToken = process.env.GOOG_KEY;
let states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT',
    'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN',
    'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN',
    'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC',
    'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI',
    'WY' ];

let statePairs = [
    {
        "name": "Alabama",
        "abbreviation": "AL"
    },
    {
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "American Samoa",
        "abbreviation": "AS"
    },
    {
        "name": "Arizona",
        "abbreviation": "AZ"
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR"
    },
    {
        "name": "California",
        "abbreviation": "CA"
    },
    {
        "name": "Colorado",
        "abbreviation": "CO"
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT"
    },
    {
        "name": "Delaware",
        "abbreviation": "DE"
    },
    {
        "name": "District Of Columbia",
        "abbreviation": "DC"
    },
    {
        "name": "Federated States Of Micronesia",
        "abbreviation": "FM"
    },
    {
        "name": "Florida",
        "abbreviation": "FL"
    },
    {
        "name": "Georgia",
        "abbreviation": "GA"
    },
    {
        "name": "Guam",
        "abbreviation": "GU"
    },
    {
        "name": "Hawaii",
        "abbreviation": "HI"
    },
    {
        "name": "Idaho",
        "abbreviation": "ID"
    },
    {
        "name": "Illinois",
        "abbreviation": "IL"
    },
    {
        "name": "Indiana",
        "abbreviation": "IN"
    },
    {
        "name": "Iowa",
        "abbreviation": "IA"
    },
    {
        "name": "Kansas",
        "abbreviation": "KS"
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY"
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA"
    },
    {
        "name": "Maine",
        "abbreviation": "ME"
    },
    {
        "name": "Marshall Islands",
        "abbreviation": "MH"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD"
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA"
    },
    {
        "name": "Michigan",
        "abbreviation": "MI"
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN"
    },
    {
        "name": "Mississippi",
        "abbreviation": "MS"
    },
    {
        "name": "Missouri",
        "abbreviation": "MO"
    },
    {
        "name": "Montana",
        "abbreviation": "MT"
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE"
    },
    {
        "name": "Nevada",
        "abbreviation": "NV"
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH"
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ"
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM"
    },
    {
        "name": "New York",
        "abbreviation": "NY"
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC"
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND"
    },
    {
        "name": "Northern Mariana Islands",
        "abbreviation": "MP"
    },
    {
        "name": "Ohio",
        "abbreviation": "OH"
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK"
    },
    {
        "name": "Oregon",
        "abbreviation": "OR"
    },
    {
        "name": "Palau",
        "abbreviation": "PW"
    },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA"
    },
    {
        "name": "Puerto Rico",
        "abbreviation": "PR"
    },
    {
        "name": "Rhode Island",
        "abbreviation": "RI"
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC"
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD"
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN"
    },
    {
        "name": "Texas",
        "abbreviation": "TX"
    },
    {
        "name": "Utah",
        "abbreviation": "UT"
    },
    {
        "name": "Vermont",
        "abbreviation": "VT"
    },
    {
        "name": "Virgin Islands",
        "abbreviation": "VI"
    },
    {
        "name": "Virginia",
        "abbreviation": "VA"
    },
    {
        "name": "Washington",
        "abbreviation": "WA"
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV"
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    }
];

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
