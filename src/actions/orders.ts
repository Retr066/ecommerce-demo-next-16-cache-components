'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getUser } from './auth';
import { orderSchema } from '@/validations/order';
import type { CartItem } from '@/stores/cart-store';

export async function createOrder(
  data: {
    shippingName: string;
    shippingEmail: string;
    shippingAddress: string;
    shippingCity: string;
    shippingPostal: string;
  },
  items: CartItem[]
) {
  const user = await getUser();

  if (!user) {
    return { error: 'Debes iniciar sesión para crear un pedido' };
  }

  const validatedFields = orderSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: 'Datos inválidos' };
  }

  if (items.length === 0) {
    return { error: 'El carrito está vacío' };
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  try {
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        status: 'PENDING',
        total,
        shippingName: data.shippingName,
        shippingEmail: data.shippingEmail,
        shippingAddress: data.shippingAddress,
        shippingCity: data.shippingCity,
        shippingPostal: data.shippingPostal,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    revalidatePath('/orders');
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error('Error creating order:', error);
    return { error: 'Error al crear el pedido' };
  }
}

export async function getUserOrders() {
  const user = await getUser();

  if (!user) {
    return [];
  }

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return orders;
}

export async function getOrderById(id: string) {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const order = await prisma.order.findFirst({
    where: {
      id,
      userId: user.id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return order;
}
