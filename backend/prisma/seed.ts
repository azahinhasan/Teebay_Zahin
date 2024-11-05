'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const client_1 = require('@prisma/client');
const prisma = new client_1.PrismaClient();
import * as bcrypt from 'bcrypt';

// Function to generate random user data
async function generateRandomUsers(num) { 
  const users = [];

  for (let i = 0; i < num; i++) {
    const password = await bcrypt.hash(`user${i + 1}@example.com`, 10);
    users.push({
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      password,
    });
  }
  return users;
}

// Function to generate random product data
function generateRandomProducts(num, users) {
  const products = [];

  for (let i = 0; i < num; i++) {
    const userIndex = Math.floor(Math.random() * users.length);
    products.push({
      userId: Math.floor(Math.random() * 10) + 1,
      name: `Product ${i + 1}`,
      description: `Description for product ${i + 1}`,
      price: parseFloat((Math.random() * 100).toFixed(2)),
      rentPrice: parseFloat((Math.random() * 50).toFixed(2)),
      totalViews: Math.floor(Math.random() * 100),
      rentDuration: Math.random() < 0.5 ? 'perHour' : 'perDay',
      status: Math.random() < 0.5 ? 'available' : 'sold',
    });
  }
  return products;
}

function generateRandomTransactions(num, users, products) {
  const transactions = [];

  for (let i = 0; i < num; i++) {
    let userId;
    let productIndex;

    do {
      userId = Math.floor(Math.random() * 10) + 1;
      productIndex = Math.floor(Math.random() * products.length)+1;
    } while (
      Math.floor(Math.random() * 10) + 1 ===
      products[productIndex].userId
    );

    transactions.push({
      userId: userId, 
      productId: productIndex, 
      transactionType: Math.random() < 0.5 ? 'bought' : 'borrowed', 
      rentalDateStart: Math.random() < 0.5 ? new Date() : null,
      rentalDateEnd:
        Math.random() < 0.5 ? new Date(Date.now() + 86400000) : null,
    });
  }
  return transactions;
}

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
    console.log(
      'Default categories created:',
      defaultCategories.map((cat) => cat.name).join(', '),
    );
  } else {
    console.log('Categories already exist.');
    return;
  }

  // Create 10 dummy users
  const dummyUsers = await generateRandomUsers(10);
  const createdUsers = await prisma.user.createMany({
    data: dummyUsers,
  });
  console.log('10 dummy users created.');

  const products = generateRandomProducts(50, createdUsers);
  await prisma.product.createMany({
    data: products,
  });
  const transactions = generateRandomTransactions(
    30,
    createdUsers,
    products,
  );
  await prisma.transaction.createMany({
    data: transactions,
  });
  console.log('50 dummy transactions created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
