'use server';

import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';

export const getProducts = unstable_cache(
  async (filters?: {
    search?: string;
    categoryId?: string | null;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    featured?: boolean;
  }) => {
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

    return products;
  },
  ['products'],
  {
    revalidate: 3600,
    tags: ['products'],
  }
);

export const getProductBySlug = unstable_cache(
  async (slug: string) => {
    const product = await prisma.product.findUnique({
      where: { slug, active: true },
      include: {
        category: true,
      },
    });

    return product;
  },
  ['product-by-slug'],
  {
    revalidate: 3600,
    tags: ['products'],
  }
);

export const getCategories = unstable_cache(
  async () => {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });

    return categories;
  },
  ['categories'],
  {
    revalidate: 7200,
    tags: ['categories'],
  }
);
