import { PrismaClient } from '@prisma/client'
import * as data from './data'

const prisma = new PrismaClient()

const shirtHoodieColors = [
  "Black", "Red", "Gray Marl",
  "Pearl Gray",
  "Navy blue", "Pale pink",
  "Dark khaki", "Anthracite grey"
];

const jeansColors = [
  "Carbon", "Mid-blue", "Light blue",
  "Gray", "Blue", "Oyster-white"
];

/**
 * Function to seed data into the database for testing
 */
async function seed() {
  // Step 1: Create Collections
  await prisma.collection.createMany({
    data: data.collectionsData.map((item) => ({
      name: item.name,
      description: item.description,
    })),
  });

  const collections = await prisma.collection.findMany({
    select: { id: true, name: true }
  });

  const collectionMap = collections.reduce((map, collection) => {
    map[collection.name] = collection.id;
    return map;
  }, {} as Record<string, string>);

  // Step 2: Create Products within each Collection
  await Promise.all([
    prisma.product.createMany({
      data: data.productsDataShirts.map((product) => ({
        name: product.name,
        description: product.description,
        price: product.price,
        collectionId: collectionMap['Shirts'],
      })),
    }),
    prisma.product.createMany({
      data: data.productsDataJeans.map((product) => ({
        name: product.name,
        description: product.description,
        price: product.price,
        collectionId: collectionMap['Jeans'],
      })),
    }),
    prisma.product.createMany({
      data: data.productsDataHoodies.map((product) => ({
        name: product.name,
        description: product.description,
        price: product.price,
        collectionId: collectionMap['Hoodies'],
      })),
    })
  ]);

  const products = await prisma.product.findMany({
    select: { id: true, name: true }
  });

  const productMap = products.reduce((map, product) => {
    map[product.name] = product.id;
    return map;
  }, {} as Record<string, string>);

  // Step 3: Create Variants using Product IDs
  await Promise.all([
    prisma.variant.createMany({
      data: data.variantDataShirt1.map((variant) => ({
        color: variant.color,
        colorCode: variant.colorCode,
        imageUrls: variant.imageUrls,
        productId: productMap['BASIC HEAVYWEIGHT T-SHIRT']
      })),
    }),
    prisma.variant.createMany({
      data: data.variantDataShirt2.map((variant) => ({
        color: variant.color,
        colorCode: variant.colorCode,
        imageUrls: variant.imageUrls,
        productId: productMap['BASIC SLIM FIT T-SHIRT']
      })),
    }),
    prisma.variant.createMany({
      data: data.variantDataJeans1.map((variant) => ({
        color: variant.color,
        colorCode: variant.colorCode,
        imageUrls: variant.imageUrls,
        productId: productMap['BAGGY FIT JEANS']
      })),
    }),
    prisma.variant.createMany({
      data: data.variantDataJeans2.map((variant) => ({
        color: variant.color,
        colorCode: variant.colorCode,
        imageUrls: variant.imageUrls,
        productId: productMap['STRAIGHT FIT JEANS']
      })),
    }),
    prisma.variant.createMany({
      data: data.variantDataHoodie1.map((variant) => ({
        color: variant.color,
        colorCode: variant.colorCode,
        imageUrls: variant.imageUrls,
        productId: productMap['HOODIE SWEATSHIRT']
      })),
    }),
    prisma.variant.createMany({
      data: data.variantDataHoodie2.map((variant) => ({
        color: variant.color,
        colorCode: variant.colorCode,
        imageUrls: variant.imageUrls,
        productId: productMap['PATCHES HOODED JACKET']
      })),
    })
  ]);

  const variants = await prisma.variant.findMany({
    select: { id: true, color: true }
  });

  // Create options for each variant
  await Promise.all([
    ...variants
      .filter(variant => shirtHoodieColors.includes(variant.color)) 
      .map(variant => prisma.option.createMany({
        data: data.optionsDataShirtsHoodies.map(option => ({
          size: option.size,
          stock: option.stock,
          variantId: variant.id
        }))
      })),
    ...variants
      .filter(variant => jeansColors.includes(variant.color)) 
      .map(variant => prisma.option.createMany({
        data: data.optionsDataJeans.map(option => ({
          size: option.size,
          stock: option.stock,
          variantId: variant.id
        }))
      }))
  ]);

  console.log('Seeding completed.')
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
