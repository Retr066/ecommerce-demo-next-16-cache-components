'use client';

import { ShoppingCart } from 'lucide-react';
import { useCartStore, type CartItem } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export function AddToCartButton({ product }: { product: CartItem }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: 'Producto añadido',
      description: `${product.name} se añadió al carrito`,
    });
  };

  return (
    <Button onClick={handleAddToCart} className="w-full gap-2">
      <ShoppingCart className="h-4 w-4" />
      Añadir al carrito
    </Button>
  );
}
