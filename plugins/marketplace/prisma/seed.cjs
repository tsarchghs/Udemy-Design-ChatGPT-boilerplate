const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// ✅ Mock photo data
const photos = [
  { id: 1, title: 'Mountain Sunset', imageUrl: 'https://picsum.photos/seed/mountain1/800/600' },
  { id: 2, title: 'Ocean Waves', imageUrl: 'https://picsum.photos/seed/ocean2/800/600' },
  { id: 3, title: 'Forest Path', imageUrl: 'https://picsum.photos/seed/forest3/800/600' },
  { id: 4, title: 'City Lights', imageUrl: 'https://picsum.photos/seed/city4/800/600' },
  { id: 5, title: 'Desert Dunes', imageUrl: 'https://picsum.photos/seed/desert5/800/600' },
  { id: 6, title: 'Northern Lights', imageUrl: 'https://picsum.photos/seed/aurora6/800/600' },
  { id: 7, title: 'Tropical Beach', imageUrl: 'https://picsum.photos/seed/beach7/800/600' },
  { id: 8, title: 'Snowy Peaks', imageUrl: 'https://picsum.photos/seed/snow8/800/600' },
  { id: 9, title: 'Autumn Colors', imageUrl: 'https://picsum.photos/seed/autumn9/800/600' },
  { id: 10, title: 'Urban Architecture', imageUrl: 'https://picsum.photos/seed/urban10/800/600' },
  { id: 11, title: 'Wildflower Meadow', imageUrl: 'https://picsum.photos/seed/flowers11/800/600' },
  { id: 12, title: 'Starry Night', imageUrl: 'https://picsum.photos/seed/stars12/800/600' },
]

async function main() {
  console.log('🌱 Seeding database...')
  await prisma.photo.deleteMany()
  console.log('🧹 Cleared all existing photo records.')

  await prisma.photo.createMany({
    data: photos.map(({ id, ...rest }) => rest), // Ignore `id` since Prisma will auto-increment
  })

  console.log(`✅ Inserted ${photos.length} photos successfully!`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error('❌ Seeding failed:', error)
    await prisma.$disconnect()
    process.exit(1)
  })
