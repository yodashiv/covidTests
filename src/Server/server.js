const { GraphQLServer } = require('graphql-yoga');

const testCard = {
    name: "I came from the API",
    address: "2222 Bancroft Way, Berkeley, CA 94720",
    phone: "(510) 643-7197",
    description: "As of April 2nd, the Tang Medical is only testing UC Berkeley Students and staff.",
    source: "dummy data",
    longitude: -122.258537,
    latitude: 37.871899
};

const resolvers = {
    Query: {
        samplecard: () => [testCard, testCard]
    }
};

const server = new GraphQLServer({
    typeDefs: './src/Server/schema.graphql',
    resolvers
});

server.start(() => console.log(`The server is running on http://localhost:4000`));

