import { getProducts } from '@/actions/products';
import { ProductGrid } from '@/components/products/product-grid';

export const revalidate = 3600; // ISR - 1 hora

export const metadata = {
  title: 'Tienda - Productos Destacados',
  description: 'Descubre nuestros productos destacados',
};

export default async function HomePage() {
  const featuredProducts = await getProducts({ featured: true });

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold mb-2">Productos Destacados</h1>
        <p className="text-foreground/60 mb-8">
          Descubre nuestra selección de productos más populares
        </p>
        <ProductGrid products={featuredProducts as any} />
      </section>
    </div>
  );
}
