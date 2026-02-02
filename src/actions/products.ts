'use server';

import { after } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { Product, Category } from '@/generated/prisma/client';

export interface SerializedProduct extends Omit<Product, 'price' | 'comparePrice'> {
  price: number;
  comparePrice: number | null;
  category?: Category;
}
// Helper para convertir Decimal a number
function serializeProduct(product: Product & { category?: Category }) : SerializedProduct {
  return {
    ...product,
    price: Number(product.price),
    comparePrice: product.comparePrice ? Number(product.comparePrice) : null,
  };
}

export async function getProducts(filters?: {
  search?: string;
  categoryId?: string | null;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  featured?: boolean;
}) {
  'use cache';

  const where: any = { active: true };

  if (filters?.search) {
    where.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { description: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  if (filters?.categoryId) {
    where.categoryId = filters.categoryId;
  }

  if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
    where.price = {
      gte: filters.minPrice ?? 0,
      lte: filters.maxPrice ?? 999999,
    };
  }

  if (filters?.featured !== undefined) {
    where.featured = filters.featured;
  }

  let orderBy: any = { createdAt: 'desc' };
  if (filters?.sortBy === 'price-asc') orderBy = { price: 'asc' };
  if (filters?.sortBy === 'price-desc') orderBy = { price: 'desc' };
  if (filters?.sortBy === 'name-asc') orderBy = { name: 'asc' };

  const products = await prisma.product.findMany({
    where,
    orderBy,
    include: {
      category: true,
    },
  });

  // Convertir Decimal a number antes de retornar
  return products.map(serializeProduct);
}

export async function getProductBySlug(slug: string) {
  'use cache';

  const product = await prisma.product.findUnique({
    where: { slug, active: true },
    include: {
      category: true,
    },
  });

  if (!product) return null;

  // Ejemplo de after() - Se ejecuta DESPUÉS de enviar la respuesta
  after(async () => {
    // Logging, analytics, o actualización de contadores
    console.log(`[Analytics] Producto visto: ${product.name} (${slug})`);
    // Aquí podrías guardar en DB, enviar a analytics, etc.
  });

  // Convertir Decimal a number antes de retornar
  return serializeProduct(product);
}

export async function getCategories() {
  'use cache';

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });

  return categories;
}
