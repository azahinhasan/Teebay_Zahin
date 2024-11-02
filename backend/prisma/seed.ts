// seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.findMany();

  if (categories.length === 0) {
    const defaultCategories = [
      { name: 'ELECTRONICS' },
      { name: 'FURNITURE' },
      { name: 'HOME APPLIANCES' },
      { name: 'SPORTING GOODS' },
      { name: 'OUTDOOR' },
      { name: 'TOYS' },
    ];

    await prisma.category.createMany({
      data: defaultCategories,
    });

    console.log('Default categories created:', defaultCategories.map(cat => cat.name).join(', '));
  } else {
    console.log('Categories already exist.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
