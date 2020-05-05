const { GraphQLServer } = require('graphql-yoga');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const testCard = {
    name: "I came from the API",
    address: "2222 Bancroft Way, Berkeley, CA 94720",
    phone: "(510) 643-7197",
    description: "As of April 2nd, the Tang Medical is only testing UC Berkeley Students and staff.",
    source: "dummy data",
    longitude: -122.258537,
    latitude: 37.871899
};

async function getSampleCards() {
    let result = await prisma.testSites.findMany();
    await prisma.disconnect();
    return result;
}

async function getSitesInCounty(obj, args) {
    let result = await prisma.testSites.findMany({
        where: {
            county: {
                equals: args.countyInput
            }
        }
    });
    await prisma.disconnect();
    return result;
}

const resolvers = {
    Query: {
        samplecard: getSampleCards,
        cardsInCounty: getSitesInCounty
    }
};

const server = new GraphQLServer({
    typeDefs: './src/Server/schema.graphql',
    resolvers
});

server.start(() => console.log(`The server is running on http://localhost:4000`));

