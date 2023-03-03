// REFERENCE: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb/querying-the-database-typescript-mongodb

// import constructor from node module
import { PrismaClient } from '@prisma/client'
// instantiate client
const prisma = new PrismaClient()

// define async function to send queries to db
async function main() {
  // Connect the client
  await prisma.$connect()

  // create a new user
  await prisma.user.create({
  data: {
      name: 'Rich',
      email: 'hello@prisma.com',
      posts: {
          create: {
              title: 'My First Post',
              body: 'Lots of really interesting stuff',
              slug: 'my-first-post'
          },
      },
  },
})

  // create a new comment
  /* await prisma.post.update({
    where: {
        slug: 'my-first-post',
    },
    data: {
        comments: {
            createMany: {
                data: [
                    { comment: 'Great post!'},
                    { comment: "Can't wait to read more!"},
                ],
            },
        },
    },
  })

  const posts = await prisma.post.findMany({
    include: {
        comments: true,
    },
  }) */

  const allUsers = await prisma.user.findMany({
    include: {
        posts: true,
    },
  })

  console.dir(allUsers, { depth: null })
}

// call the main function and terminate connection when done
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })