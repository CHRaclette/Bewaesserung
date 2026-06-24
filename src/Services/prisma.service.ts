import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';
import { PrismaMssql } from '@prisma/adapter-mssql';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
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

    super({ adapter });
  }
}
