import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // ← IMPORTANTE
async function main() {
  // Crear usuarios
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin123', // hashéalos en producción
      role: 'ADMIN'
    }
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      name: 'Brian',
      email: 'user@example.com',
      password: 'user123',
      role: 'USER'
    }
  });

  // Crear bebidas
  const drinks = await prisma.drink.createMany({
    data: [
      { name: 'aguila light', unit: 'botella', stock: 50, purchasePrice: 1800, salePrice: 2500 },
      { name: 'aguila light', unit: 'botellon', stock: 50, purchasePrice: 2500, salePrice: 3000 },
      { name: 'aguila light', unit: 'lata', stock: 50, purchasePrice: 1800, salePrice: 2500 },
      { name: 'aguila light', unit: 'laton', stock: 50, purchasePrice: 1800, salePrice: 2500 },
      { name: 'poker', unit: 'botella', stock: 30, purchasePrice: 1700, salePrice: 2400 },
      { name: 'poker', unit: 'botellon', stock: 30, purchasePrice: 1700, salePrice: 2400 },
      { name: 'poker', unit: 'lata', stock: 30, purchasePrice: 1700, salePrice: 2400 },
      { name: 'poker', unit: 'laton', stock: 30, purchasePrice: 1700, salePrice: 2400 },
      { name: 'budweiser', unit: 'lata', stock: 20, purchasePrice: 2000, salePrice: 2800 },
      { name: 'stella', unit: 'botella', stock: 40, purchasePrice: 1500, salePrice: 2200 },
    ]
  });

  // Crear un cambio de inventario
  const aguila = await prisma.drink.findFirst({ where: { name: 'aguila light' } });

  await prisma.inventoryChange.create({
    data: {
      drinkId: aguila.id,
      userId: admin.id,
      change: 10,
      reason: 'Reabastecimiento inicial'
    }
  });

  // Registrar un consumo
  await prisma.consumption.create({
    data: {
      drinkId: aguila.id,
      userId: user.id,
      amount: 2,
      note: 'Consumo de prueba',
      consumptionDate: new Date()
    }
  });

  console.log('✅ Datos insertados correctamente');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

