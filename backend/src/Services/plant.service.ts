import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Plant, Prisma } from 'generated/prisma/client';

@Injectable()
export class PlantService {
  constructor(private prisma: PrismaService) {}

  async plant(
    plantWhereUniqueInput: Prisma.PlantWhereUniqueInput,
  ): Promise<Plant | null> {
    return this.prisma.plant.findUnique({
      where: plantWhereUniqueInput,
    });
  }

  async plants(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PlantWhereUniqueInput;
    where?: Prisma.PlantWhereInput;
    orderBy?: Prisma.PlantOrderByWithRelationInput;
  }): Promise<Plant[]> {
    const { skip, take, cursor, where, orderBy } = params;

  return this.prisma.plant.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    } );
  }

  async createPlant(data: Prisma.PlantCreateInput): Promise<Plant> {
    return this.prisma.plant.create({
      data,
    });
  }

  async updatePlant(params: {
    where: Prisma.PlantWhereUniqueInput;
    data: Prisma.PlantUpdateInput;
  }): Promise<Plant> {
    const { where, data } = params;

    return this.prisma.plant.update({
      where,
      data,
    });
  }

  async deletePlant(where: Prisma.PlantWhereUniqueInput): Promise<Plant> {
    return this.prisma.plant.delete({
      where,
    });
  }
}
