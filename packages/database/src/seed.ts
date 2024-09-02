import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function seed() {
  // Create Collections
  const collections = await prisma.collection.createMany({
    data: Array.from({ length: 3 }).map(() => ({
      name: `${faker.color.human()} Collection`,
      description: faker.lorem.sentence(),
    })),
  })

  const collectionIds = await prisma.collection.findMany({
    select: { id: true },
  })

  for (const collection of collectionIds) {
    // Create Products within each Collection
    const products = await prisma.product.createMany({
      data: Array.from({ length: 5 }).map(() => ({
        name: faker.commerce.productName(),
        imageUrl: faker.image.url(),
        description: faker.commerce.productDescription(),
        price: parseFloat(
          faker.commerce.price({
            min: 10,
            max: 100,
          }),
        ),
        collectionId: collection.id,
      })),
    })

    const productIds = await prisma.product.findMany({
      where: { collectionId: collection.id },
      select: { id: true },
    })

    for (const product of productIds) {
      // Create Variants for each Product
      const variants = await prisma.variant.createMany({
        data: Array.from({ length: 3 }).map(() => ({
          productId: product.id,
        })),
      })

      const variantIds = await prisma.variant.findMany({
        where: { productId: product.id },
        select: { id: true },
      })

      for (const variant of variantIds) {
        // Create Options for each Variant
        const options = await prisma.option.createMany({
          data: Array.from({ length: 3 }).map(() => ({
            color: faker.color.human(),
            size: faker.helpers.arrayElement(['S', 'M', 'L', 'XL']),
            stock: faker.datatype.number({ min: 1, max: 100 }),
            variantId: variant.id,
          })),
        })
      }
    }
  }

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
