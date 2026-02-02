
import Link from 'next/link';
import { Store } from 'lucide-react';
import { Suspense } from 'react';

export async function Footer() {
    "use cache"
  // const timeAgo = performance.now();
  // console.log(tim)
  // Acceder a headers() para hacer el componente dinámico (requerido por Next.js 16)
  // await headers();

  return (
    <footer className="border-t border-foreground/10 bg-background mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
              <Store className="h-5 w-5" />
              <span>TiendaNext</span>
            </Link>
            <p className="text-sm text-foreground/60">
              Tu tienda online de confianza con los mejores productos.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Productos</h3>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <Link href="/products" className="hover:text-foreground transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Destacados
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Cuenta</h3>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <Link href="/orders" className="hover:text-foreground transition-colors">
                  Mis Pedidos
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-foreground transition-colors">
                  Iniciar Sesión
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Centro de Ayuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-foreground/10 mt-8 pt-8 text-center text-sm text-foreground/60">
          <p>
            &copy; {new Date().getFullYear()} TiendaNext. Todos los derechos reservados.
          </p>
          <p className="mt-2">
            Hecho con Next.js 16, Supabase y Prisma
          </p>
        </div>
      </div>
    </footer>
  );
}
