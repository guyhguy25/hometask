import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const firstTask = await prisma.task.upsert({
    where: {
        id: "1",
    },
    update: {},
    create: {
        text: "abcde",
        taskNumber: 1,
        status: "uncompleted",
    },
  })
  const secondTask = await prisma.task.upsert({
    where: {
        id: "2",
    },
    update: {},
    create: {
        text: "fghijk",
        taskNumber: 2,
        status: "completed",
    },
  })
  const thirdTask = await prisma.task.upsert({
    where: {
        id: "3",
    },
    update: {},
    create: {
        text: "lmnop",
        taskNumber: 3,
        status: "completed",
    },
  })

  console.log('Inital Tasks created');
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })