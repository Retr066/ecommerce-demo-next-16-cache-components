import { ProductCard } from './product-card';
import { SerializedProduct } from '@/actions/products';


export function ProductGrid({ products }: { products: SerializedProduct[] }) {
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
