import { getProducts, getCategories } from '@/actions/products';
import { ProductGrid } from '@/components/products/product-grid';

export const metadata = {
  title: 'Todos los Productos',
  description: 'Explora nuestro catálogo completo de productos',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  const { category, search } = await searchParams;

  const [products, categories] = await Promise.all([
    getProducts({
      categoryId: category,
      search,
    }),
    getCategories(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Todos los Productos</h1>
        <p className="text-foreground/60">
          Explora nuestro catálogo completo
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-64 space-y-4">
          <div>
            <h3 className="font-semibold mb-3">Categorías</h3>
            <div className="space-y-2">
              <a
                href="/products"
                className={`block px-3 py-2 rounded-md transition-colors ${
                  !category ? 'bg-foreground/10' : 'hover:bg-foreground/5'
                }`}
              >
                Todas
              </a>
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`/products?category=${cat.id}`}
                  className={`block px-3 py-2 rounded-md transition-colors ${
                    category === cat.id ? 'bg-foreground/10' : 'hover:bg-foreground/5'
                  }`}
                >
                  {cat.name}
                </a>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <ProductGrid products={products as any} />
        </div>
      </div>
    </div>
  );
}
