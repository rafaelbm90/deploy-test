import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rafael.b.moraes@gmail.com";

  const hashedPassword = await bcrypt.hash("remixiscool", 10);

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const posts = [
    {
      id: "001",
      title: "My First Post!",
      body: `This is my first post!
            Isn't it great?
            `.trim(),
    },
    {
      id: "002",
      title: "My Second Post!",
      body: `Floating the trails
            Have you ever tried riding a onewheel? It's an out-of-this-world _experience_!
            Imagine that, but in the beauty of nature and it's just amazing.
            `.trim(),
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { id: post.id },
      update: post,
      create: post,
    });
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
