import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { seedDatabase } from './seed-data';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(private prisma: PrismaService) {}

  async onModuleInit(): Promise<void> {
    const userCount = await this.prisma.user.count();
    if (userCount > 0) {
      return;
    }

    this.logger.log('No data found, seeding database...');
    await seedDatabase(this.prisma);
    this.logger.log('Seed data created.');
  }
}
