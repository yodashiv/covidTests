// This is where the logic for collecting the data from castlight will reside.
// This module will then use prisma to interact with our database and update it
// with the new data that we will fetch every night.
// Will put this cron job function onto google cloud function.
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cheerio = require('cheerio');
const jquery = require("jquery");
const fs = require('fs');


async function fetchAllStateCountyPairs() {
    let states = ["CA"];

    let $ = cheerio.load(fs.readFileSync("/Users/shivampatel/Projects/covid/covidproject/src/Server/sampleCounties.html"));
    console.log($("option").text());
    return 8;
}

async function getStateCountyPairsFromDB() {
    let result = await prisma.regions.findMany();
    console.log("Done with func");
    await prisma.disconnect();
    return result;
}

async function getAllTestSites() {
    let stateCountyPairs = await getStateCountyPairsFromDB();
    let result = [];
    stateCountyPairs.map(
        (pair, index) => {
            result.push(fetchSites(pair.state, pair.county));
        });
    return result;
}

function fetchSites(state, county) {
    let url = `https://my.castlighthealth.com/corona-virus-testing-sites/data/result.php?county=${county}&state=${state}`;
    let $ = cheerio.load(fs.readFileSync("/Users/shivampatel/Projects/covid/covidproject/src/Server/sampleTestSites.html"));
    // console.log($("h2").text()); // Gets the name
    // console.log($("img[alt='Icon pin']").next().text()); // gets the address
    // console.log($("img[alt='Icon call']").next().text()); // gets the phone
    // console.log($("a[style='color: #282C37;']").text()); // gets the source
    return state;

}

fetchAllStateCountyPairs();

// getAllTestSites().then(
//     (result) => {
//         console.log(result);
//     }
// );

// make sure that we disconnect from our data base once we are done writing to it through prisma client.
