import { prisma } from "@/lib/prisma";

async function main() {
  console.log('🌱 Seeding database...');

  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'electronics' },
      update: {},
      create: {
        name: 'Electrónica',
        slug: 'electronics',
        description: 'Dispositivos electrónicos y gadgets',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'clothing' },
      update: {},
      create: {
        name: 'Ropa',
        slug: 'clothing',
        description: 'Moda y accesorios',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'home' },
      update: {},
      create: {
        name: 'Hogar',
        slug: 'home',
        description: 'Artículos para el hogar',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'sports' },
      update: {},
      create: {
        name: 'Deportes',
        slug: 'sports',
        description: 'Equipo deportivo y fitness',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'books' },
      update: {},
      create: {
        name: 'Libros',
        slug: 'books',
        description: 'Libros y material de lectura',
      },
    }),
  ]);

  console.log('✅ Categories created');

  // Products
  const products = [
    {
      name: 'Auriculares Inalámbricos Premium',
      slug: 'auriculares-premium',
      description: 'Auriculares con cancelación de ruido activa y hasta 30 horas de batería',
      price: 299.99,
      comparePrice: 399.99,
      stock: 50,
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'],
      featured: true,
      categoryId: categories[0].id,
    },
    {
      name: 'Laptop Pro 15"',
      slug: 'laptop-pro-15',
      description: 'Laptop profesional con procesador de última generación y 16GB RAM',
      price: 1499.99,
      comparePrice: 1799.99,
      stock: 25,
      images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800'],
      featured: true,
      categoryId: categories[0].id,
    },
    {
      name: 'Smartwatch Deportivo',
      slug: 'smartwatch-deportivo',
      description: 'Reloj inteligente con GPS y monitor de frecuencia cardíaca',
      price: 249.99,
      stock: 75,
      images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'],
      featured: true,
      categoryId: categories[0].id,
    },
    {
      name: 'Cámara Digital 4K',
      slug: 'camara-digital-4k',
      description: 'Cámara profesional con grabación 4K y estabilización de imagen',
      price: 899.99,
      stock: 15,
      images: ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800'],
      categoryId: categories[0].id,
    },
    {
      name: 'Tablet 10"',
      slug: 'tablet-10',
      description: 'Tablet con pantalla Full HD y 128GB de almacenamiento',
      price: 349.99,
      stock: 40,
      images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800'],
      categoryId: categories[0].id,
    },
    {
      name: 'Camiseta Básica Premium',
      slug: 'camiseta-basica',
      description: 'Camiseta de algodón 100% orgánico',
      price: 29.99,
      stock: 200,
      images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'],
      categoryId: categories[1].id,
    },
    {
      name: 'Jeans Slim Fit',
      slug: 'jeans-slim-fit',
      description: 'Jeans de mezclilla con corte moderno',
      price: 79.99,
      stock: 150,
      images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=800'],
      featured: true,
      categoryId: categories[1].id,
    },
    {
      name: 'Chaqueta de Cuero',
      slug: 'chaqueta-cuero',
      description: 'Chaqueta de cuero genuino con forro térmico',
      price: 299.99,
      stock: 30,
      images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800'],
      categoryId: categories[1].id,
    },
    {
      name: 'Zapatillas Deportivas',
      slug: 'zapatillas-deportivas',
      description: 'Zapatillas con tecnología de amortiguación avanzada',
      price: 129.99,
      stock: 100,
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'],
      categoryId: categories[1].id,
    },
    {
      name: 'Sofá Modular 3 Plazas',
      slug: 'sofa-modular',
      description: 'Sofá modular con tapizado de tela premium',
      price: 899.99,
      stock: 10,
      images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'],
      featured: true,
      categoryId: categories[2].id,
    },
    {
      name: 'Lámpara de Pie Moderna',
      slug: 'lampara-pie',
      description: 'Lámpara de pie con diseño minimalista',
      price: 149.99,
      stock: 35,
      images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800'],
      categoryId: categories[2].id,
    },
    {
      name: 'Set de Sábanas Premium',
      slug: 'sabanas-premium',
      description: 'Set completo de sábanas de algodón egipcio',
      price: 89.99,
      stock: 60,
      images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'],
      categoryId: categories[2].id,
    },
    {
      name: 'Mesa de Comedor',
      slug: 'mesa-comedor',
      description: 'Mesa de madera maciza para 6 personas',
      price: 599.99,
      stock: 12,
      images: ['https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800'],
      categoryId: categories[2].id,
    },
    {
      name: 'Bicicleta de Montaña',
      slug: 'bicicleta-montana',
      description: 'Bicicleta con suspensión completa y 21 velocidades',
      price: 799.99,
      stock: 20,
      images: ['https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800'],
      featured: true,
      categoryId: categories[3].id,
    },
    {
      name: 'Pesas Ajustables 20kg',
      slug: 'pesas-ajustables',
      description: 'Set de mancuernas ajustables hasta 20kg',
      price: 159.99,
      stock: 45,
      images: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800'],
      categoryId: categories[3].id,
    },
    {
      name: 'Esterilla de Yoga Premium',
      slug: 'esterilla-yoga',
      description: 'Esterilla antideslizante con grosor de 6mm',
      price: 49.99,
      stock: 80,
      images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800'],
      categoryId: categories[3].id,
    },
    {
      name: 'Balón de Fútbol Profesional',
      slug: 'balon-futbol',
      description: 'Balón oficial con tecnología de última generación',
      price: 79.99,
      stock: 55,
      images: ['https://images.unsplash.com/photo-1614632537423-ecb841f0f1f5?w=800'],
      categoryId: categories[3].id,
    },
    {
      name: 'El Quijote - Edición Ilustrada',
      slug: 'quijote-ilustrado',
      description: 'Edición de lujo con ilustraciones originales',
      price: 39.99,
      stock: 70,
      images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800'],
      categoryId: categories[4].id,
    },
    {
      name: 'Colección Harry Potter',
      slug: 'harry-potter-coleccion',
      description: 'Set completo de 7 libros en tapa dura',
      price: 149.99,
      stock: 25,
      images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800'],
      featured: true,
      categoryId: categories[4].id,
    },
    {
      name: 'Guía de Cocina Profesional',
      slug: 'guia-cocina',
      description: 'Manual completo con más de 500 recetas',
      price: 59.99,
      stock: 40,
      images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800'],
      categoryId: categories[4].id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  console.log('✅ Products created');
  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
