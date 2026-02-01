'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore, type CartItem } from '@/stores/cart-store';
import { formatPrice } from '@/lib/format';
import { Button } from '@/components/ui/button';

export function CartItemComponent({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCartStore();

  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.productId, item.quantity - 1);
    }
  };

  const increaseQuantity = () => {
    updateQuantity(item.productId, item.quantity + 1);
  };

  return (
    <div className="flex gap-4 py-4 border-b border-foreground/10">
      <Link href={`/products/${item.slug}`} className="relative w-24 h-24 bg-foreground/5 rounded-md overflow-hidden flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </Link>

      <div className="flex-1 flex flex-col gap-2">
        <Link href={`/products/${item.slug}`} className="font-semibold hover:underline">
          {item.name}
        </Link>
        <p className="text-lg font-bold">{formatPrice(item.price)}</p>

        <div className="flex items-center gap-2 mt-auto">
          <div className="flex items-center border border-foreground/20 rounded-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={decreaseQuantity}
              className="h-8 w-8"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={increaseQuantity}
              className="h-8 w-8"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeItem(item.productId)}
            className="ml-auto text-red-500 hover:text-red-600 hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-bold text-lg">{formatPrice(item.price * item.quantity)}</p>
      </div>
    </div>
  );
}
