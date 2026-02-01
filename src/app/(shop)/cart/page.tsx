'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { formatPrice } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CartItemComponent } from '@/components/cart/cart-item';

export default function CartPage() {
  const { items, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <ShoppingBag className="h-24 w-24 text-foreground/20 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Tu carrito está vacío</h2>
        <p className="text-foreground/60 mb-6">Agrega productos para empezar a comprar</p>
        <Button asChild>
          <Link href="/products">Ver Productos</Link>
        </Button>
      </div>
    );
  }

  const total = getTotalPrice();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Carrito de Compras</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItemComponent key={item.productId} item={item} />
          ))}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-foreground/60">Subtotal</span>
                <span className="font-semibold">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Envío</span>
                <span className="font-semibold">Gratis</span>
              </div>
              <div className="border-t border-foreground/10 pt-4">
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">{formatPrice(total)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button asChild className="w-full">
                <Link href="/checkout">Proceder al Pago</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/products">Seguir Comprando</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
