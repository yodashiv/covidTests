const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addStatesCol() {
    let results = await prisma.testSites.findMany({
        select: {address: true}
    });

    for (const jsonAdd of results) {
        let addInArray = jsonAdd.address.split(" ");
        let state = addInArray[addInArray.length - 2];
        await prisma.testSites.updateMany({
            where: {address: jsonAdd.address},
            data: {state: state},
        });
    }
}

addStatesCol().then(
    (result) => {
        prisma.disconnect();
    }
)
