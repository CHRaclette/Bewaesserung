import { createHash } from 'crypto';
import { PrismaClient } from 'generated/prisma/client';

export function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

export const subscriptions = ['BASIC', 'PREMIUM', 'PRO'];

export const users = [
  { username: 'admin', password: 'admin123', role: 'ADMIN', plan: 'PRO' },
  { username: 'jdoe', password: 'password1', role: 'USER', plan: 'BASIC' },
  { username: 'asmith', password: 'password2', role: 'USER', plan: 'PREMIUM' },
];

export const plants = [
  { name: 'Monstera Deliciosa', price: 35, height: 60, location: 'Indoor' },
  { name: 'Ficus Lyrata', price: 45, height: 120, location: 'Indoor' },
  { name: 'Aloe Vera', price: 12, height: 25, location: 'Indoor' },
  { name: 'Sansevieria', price: 18, height: 50, location: 'Indoor' },
  { name: 'Lavandula', price: 8, height: 40, location: 'Outdoor' },
  { name: 'Rosa', price: 15, height: 80, location: 'Outdoor' },
  { name: 'Buxus', price: 20, height: 100, location: 'Outdoor' },
  { name: 'Olea Europaea', price: 60, height: 150, location: 'Outdoor' },
];

export async function seedDatabase(prisma: PrismaClient): Promise<void> {
  for (const name of subscriptions) {
    await prisma.subscription.upsert({
      where: { id: subscriptions.indexOf(name) + 1 },
      update: { name },
      create: { name },
    });
  }

  for (const user of users) {
    await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: {
        username: user.username,
        passwordHash: hashPassword(user.password),
        role: user.role,
        plan: user.plan,
      },
    });
  }

  for (const plant of plants) {
    await prisma.plant.upsert({
      where: { id: plants.indexOf(plant) + 1 },
      update: plant,
      create: plant,
    });
  }
}
