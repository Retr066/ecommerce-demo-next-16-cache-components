import { ProductCard } from './product-card';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number | any;
  comparePrice?: number | null | any;
  images: string[];
  featured?: boolean;
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground/60">No se encontraron productos</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
