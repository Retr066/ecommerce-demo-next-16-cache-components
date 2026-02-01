import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/actions/products';
import { formatPrice } from '@/lib/format';
import { AddToCartButton } from '@/components/products/add-to-cart-button';
import { Badge } from '@/components/ui/badge';

export async function generateStaticParams() {
  const products = await getProducts({});
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Producto no encontrado',
    };
  }

  return {
    title: product.name,
    description: product.description || `Compra ${product.name} en nuestra tienda`,
  };
}

export const revalidate = 3600; // ISR - 1 hora

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const hasDiscount = product.comparePrice && product.comparePrice > product.price;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative aspect-square bg-foreground/5 rounded-lg overflow-hidden">
          <Image
            src={product.images[0] || '/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {hasDiscount && (
            <Badge className="absolute top-4 right-4 bg-red-500 text-white text-lg px-3 py-1">
              -{Math.round(((Number(product.comparePrice) - Number(product.price)) / Number(product.comparePrice)) * 100)}%
            </Badge>
          )}
          {product.featured && (
            <Badge className="absolute top-4 left-4 text-lg px-3 py-1">Destacado</Badge>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              {product.category.name}
            </Badge>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold">{formatPrice(Number(product.price))}</span>
              {hasDiscount && (
                <span className="text-xl text-foreground/50 line-through">
                  {formatPrice(Number(product.comparePrice))}
                </span>
              )}
            </div>
          </div>

          {product.description && (
            <div>
              <h2 className="font-semibold mb-2">Descripción</h2>
              <p className="text-foreground/70 leading-relaxed">{product.description}</p>
            </div>
          )}

          <div>
            <p className="text-sm text-foreground/60 mb-4">
              {product.stock > 0 ? (
                <span className="text-green-600 dark:text-green-400">
                  ✓ En stock ({product.stock} disponibles)
                </span>
              ) : (
                <span className="text-red-600 dark:text-red-400">✗ Agotado</span>
              )}
            </p>

            <AddToCartButton
              product={{
                productId: product.id,
                name: product.name,
                slug: product.slug,
                price: Number(product.price),
                image: product.images[0],
                quantity: 1,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
