'use client';

import { useState, useEffect, use, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/stores/cart-store';
import { createOrder } from '@/actions/orders';
import { formatPrice } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart,hasHydrated } = useCartStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!hasHydrated) return; // ⬅️ espera localStorage

    if (items.length === 0) {
      router.push('/cart');
    }
  }, [hasHydrated, items.length, router]);


  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <p>Cargando Productos Seleccionados...</p>
      </div>
    );
  }

  const total = getTotalPrice();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      const data = {
        shippingName: formData.get('shippingName') as string,
        shippingEmail: formData.get('shippingEmail') as string,
        shippingAddress: formData.get('shippingAddress') as string,
        shippingCity: formData.get('shippingCity') as string,
        shippingPostal: formData.get('shippingPostal') as string,
      };

      const result = await createOrder(data, items);

      if (result.error) {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      } else if (result.success && result.orderId) {
        clearCart();
        toast({
          title: 'Pedido creado',
          description: 'Tu pedido ha sido creado exitosamente',
        });
        router.push(`/orders/${result.orderId}`);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Ocurrió un error al crear el pedido',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Finalizar Compra</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Información de Envío</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shippingName">Nombre Completo</Label>
                  <Input
                    id="shippingName"
                    name="shippingName"
                    required
                    placeholder="Juan Pérez"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shippingEmail">Email</Label>
                  <Input
                    id="shippingEmail"
                    name="shippingEmail"
                    type="email"
                    required
                    placeholder="juan@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shippingAddress">Dirección</Label>
                  <Input
                    id="shippingAddress"
                    name="shippingAddress"
                    required
                    placeholder="Calle Principal 123"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="shippingCity">Ciudad</Label>
                    <Input
                      id="shippingCity"
                      name="shippingCity"
                      required
                      placeholder="Madrid"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shippingPostal">Código Postal</Label>
                    <Input
                      id="shippingPostal"
                      name="shippingPostal"
                      required
                      placeholder="28001"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Procesando...' : `Confirmar Pedido - ${formatPrice(total)}`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span className="text-foreground/70">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-foreground/10 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-foreground/60">Subtotal</span>
                  <span className="font-semibold">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Envío</span>
                  <span className="font-semibold">Gratis</span>
                </div>
                <div className="flex justify-between text-lg pt-2 border-t border-foreground/10">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">{formatPrice(total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
