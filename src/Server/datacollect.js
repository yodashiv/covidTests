// This is where the logic for collecting the data from castlight will reside.
// This module will then use prisma to interact with our database and update it
// with the new data that we will fetch every night.
// Will put this cron job function onto google cloud function.
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const htmlparser2 = require("htmlparser2");
const fs = require('fs');

const parser = new htmlparser2.Parser(
    {
        onopentag(name, attrs) {
            if (name === "h2") {
                console.log(attrs);
            }
        }
    }
)

async function getStateCountyPairs() {
    let result = await prisma.regions.findMany();
    console.log("Done with func");
    await prisma.disconnect();
    return result;
}

async function fetchData() {
    let stateCountyPairs = await getStateCountyPairs();
    let result = [];
    stateCountyPairs.map(
        (pair, index) => {
            result.push(getSites(pair.state, pair.county));
        });
    return result;
}

function getSites(state, county) {
    let url = `https://my.castlighthealth.com/corona-virus-testing-sites/data/result.php?county=${county}&state=${state}`;
    parser.write(fs.readFileSync("/Users/shivampatel/Projects/covid/covidproject/src/Server/sample.html"));
    parser.end();
}

console.log(fetchData());

// make sure that we disconnect from our data base once we are done writing to it through prisma client.

// let test = getStateCountyPairs();
// setTimeout(() => {
//     console.log(test);
//     console.log("afterin");
// }, 1000);
// console.log(test);
// console.log("after");
