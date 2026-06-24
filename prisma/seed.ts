import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaMssql } from '@prisma/adapter-mssql';
import { seedDatabase } from '../src/Services/seed-data';

const adapter = new PrismaMssql({
  server: 'localhost',
  port: 1433,
  database: 'pflanzePrisma',
  user: process.env.SQLSERVER_USER,
  password: process.env.SQLSERVER_PASSWORD,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
});

const prisma = new PrismaClient({ adapter });

seedDatabase(prisma)
  .then(() => {
    console.log('Seed data created.');
  })
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
