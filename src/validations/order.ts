import { z } from 'zod';

export const orderSchema = z.object({
  shippingName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  shippingEmail: z.string().email('Email inválido'),
  shippingAddress: z.string().min(5, 'La dirección debe tener al menos 5 caracteres'),
  shippingCity: z.string().min(2, 'La ciudad debe tener al menos 2 caracteres'),
  shippingPostal: z.string().min(4, 'El código postal debe tener al menos 4 caracteres'),
});

export type OrderInput = z.infer<typeof orderSchema>;
