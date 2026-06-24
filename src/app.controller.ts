import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './Services/user.service';
import { SubscriptionService } from './Services/subscription.service';
import { PlantService } from './Services/plant.service';
import {
  User as UserModel,
  Subscription as SubscriptionModel,
  Plant as PlantModel,
} from 'generated/prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UsersService,
    private readonly subscriptionService: SubscriptionService,
    private readonly plantService: PlantService,
  ) {}

  @Get('user/:id')
  async getUserById(@Param('id') id: string): Promise<UserModel | null> {
    return this.userService.user({ id: Number(id) });
  }
  @Get('users')
  async getUsers(): Promise<UserModel[]> {
    return this.userService.users({});
  }
  @Delete('user/:id') //cannot be deleted if user is admin or linked to a subscription, needs to implement edge case where user is linked to a subscription and cannot be deleted
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }
  @Get('subscription/:id')
  async getSubscriptionById(
    @Param('id') id: string,
  ): Promise<SubscriptionModel | null> {
    return this.subscriptionService.subscription({ id: Number(id) });
  }
  @Get('subscriptions')
  async getSubscriptions(): Promise<SubscriptionModel[]> {
    return this.subscriptionService.subscriptions({});
  }
  @Delete('subscription/:id') //needs to implement edge case where subscription is linked to a user and cannot be deleted
  async deleteSubscription(
    @Param('id') id: string,
  ): Promise<SubscriptionModel> {
    return this.subscriptionService.deleteSubscription({ id: Number(id) });
  }
  @Get('plants')
  async getPlants(): Promise<PlantModel[]> {
    return this.plantService.plants({});
  }
  @Get('plant/:id')
  async getPlantById(@Param('id') id: string): Promise<PlantModel | null> {
    return this.plantService.plant({ id: Number(id) });
  }
  @Delete('plant/:id') //needs to implement edge case where plant is linked to a user and cannot be deleted
  async deletePlant(@Param('id') id: string): Promise<PlantModel> {
    return this.plantService.deletePlant({ id: Number(id) });
  }
  @Post('user')
  async signupUser(
    @Body()
    userData: {
      username: string;
      passwordHash: string;
      role: string;
      plan: string;
    },
  ): Promise<UserModel> {
    return await this.userService.createUser(userData);
  }
  @Post('plant')
  async createPlant(
    @Body()
    plantData: {
      name: string;
      price: number;
      height: number;
      location: string;
    },
  ): Promise<PlantModel> {
    return await this.plantService.createPlant(plantData);
  }
  @Post('subscription')
  async createSubscription(
    @Body()
    subscriptionData: {
      name: string;
    },
  ): Promise<SubscriptionModel> {
    return await this.subscriptionService.createSubscription(subscriptionData);
  }
  @Put('user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body()
    userData: {
      username?: string;
      passwordHash?: string;
      role?: string;
      plan?: string;
    },
  ): Promise<UserModel> {
    return await this.userService.updateUser({
      where: { id: Number(id) },
      data: userData,
    });
  }
  @Put('plant/:id')
  async updatePlant(
    @Param('id') id: string,
    @Body()
    plantData: {
      name?: string;
      price?: number;
      height?: number;
      location?: string;
    },
  ): Promise<PlantModel> {
    return await this.plantService.updatePlant({
      where: { id: Number(id) },
      data: plantData,
    });
  }
  @Put('subscription/:id')
  async updateSubscription(
    @Param('id') id: string,
    @Body()
    subscriptionData: {
      name?: string;
    },
  ): Promise<SubscriptionModel> {
    return await this.subscriptionService.updateSubscription({
      where: { id: Number(id) },
      data: subscriptionData,
    });
  }
  @Put('user/:id/plan')
  async updateUserPlan(
    @Param('id') id: string,
    @Body()
    planData: {
      plan: string;
    },
  ): Promise<UserModel> {
    return await this.userService.updateUser({
      where: { id: Number(id) },
      data: planData,
    });
  }
}
