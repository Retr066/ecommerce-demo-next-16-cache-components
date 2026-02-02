import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/format';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AddToCartButton } from './add-to-cart-button';

export interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    comparePrice: number | null;
    images: string[];
    featured: boolean;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;

  return (
    <Card className="group overflow-hidden h-full flex flex-col">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-foreground/5">
          <Image
            src={product.images[0] || '/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {hasDiscount && (
            <Badge className="absolute top-2 right-2 bg-red-500 text-white">
              -{Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)}%
            </Badge>
          )}
          {product.featured && (
            <Badge className="absolute top-2 left-2">Destacado</Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-4 flex-1">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:underline">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xl font-bold">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className="text-sm text-foreground/50 line-through">
              {formatPrice(product.comparePrice!)}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <AddToCartButton
          product={{
            productId: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            image: product.images[0],
            quantity: 1,
          }}
        />
      </CardFooter>
    </Card>
  );
}
