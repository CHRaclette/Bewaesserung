import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './Services/prisma.service';
import { UsersService } from './Services/user.service';
import { SubscriptionService } from './Services/subscription.service';
import { SeedService } from './Services/seed.service';
import { PlantService } from './Services/plant.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    UsersService,
    SubscriptionService,
    SeedService,
    PlantService,
  ],
})
export class AppModule {}
