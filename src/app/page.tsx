import Link from "next/link";
import { ShoppingBag, Package, User, ShoppingCart, Grid3x3, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-50 to-zinc-100">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-zinc-900 mb-4">
            TiendaNext Demo
          </h1>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
            E-commerce completo con Next.js 16, Supabase y Prisma
          </p>
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Productos */}
          <Link
            href="/products"
            className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all border border-zinc-200 hover:border-zinc-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-zinc-900">Productos</h2>
            </div>
            <p className="text-zinc-600">
              Explora nuestro catálogo completo de productos con filtros y búsqueda
            </p>
          </Link>

          {/* Productos Destacados */}
          <Link
            href="/products?featured=true"
            className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all border border-zinc-200 hover:border-zinc-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                <Sparkles className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-2xl font-semibold text-zinc-900">Destacados</h2>
            </div>
            <p className="text-zinc-600">
              Los productos más populares y recomendados de nuestra tienda
            </p>
          </Link>

          {/* Categorías */}
          <Link
            href="/products"
            className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all border border-zinc-200 hover:border-zinc-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <Grid3x3 className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-semibold text-zinc-900">Categorías</h2>
            </div>
            <p className="text-zinc-600">
              Electrónica, Ropa, Hogar, Deportes, Libros y más
            </p>
          </Link>

          {/* Carrito */}
          <Link
            href="/cart"
            className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all border border-zinc-200 hover:border-zinc-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-zinc-900">Carrito</h2>
            </div>
            <p className="text-zinc-600">
              Revisa tu carrito de compras y procede al checkout
            </p>
          </Link>

          {/* Mis Pedidos */}
          <Link
            href="/orders"
            className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all border border-zinc-200 hover:border-zinc-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-semibold text-zinc-900">Mis Pedidos</h2>
            </div>
            <p className="text-zinc-600">
              Consulta el estado de tus pedidos y el historial de compras
            </p>
          </Link>

          {/* Mi Cuenta */}
          <Link
            href="/login"
            className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all border border-zinc-200 hover:border-zinc-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                <User className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-semibold text-zinc-900">Mi Cuenta</h2>
            </div>
            <p className="text-zinc-600">
              Accede a tu cuenta o regístrate para empezar a comprar
            </p>
          </Link>
        </div>

        {/* Features */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-zinc-200">
            <h3 className="text-2xl font-semibold text-zinc-900 mb-6 text-center">
              Características de la Demo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                <div>
                  <p className="font-medium text-zinc-900">Next.js 16 App Router</p>
                  <p className="text-sm text-zinc-600">Server Components, Server Actions, ISR</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                <div>
                  <p className="font-medium text-zinc-900">Prisma ORM</p>
                  <p className="text-sm text-zinc-600">Type-safe database access</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                <div>
                  <p className="font-medium text-zinc-900">Supabase Auth</p>
                  <p className="text-sm text-zinc-600">Autenticación segura con PostgreSQL</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                <div>
                  <p className="font-medium text-zinc-900">Zustand + Persist</p>
                  <p className="text-sm text-zinc-600">Estado global con persistencia</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                <div>
                  <p className="font-medium text-zinc-900">Tailwind CSS v4</p>
                  <p className="text-sm text-zinc-600">Diseño responsive y moderno</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                <div>
                  <p className="font-medium text-zinc-900">TypeScript Strict</p>
                  <p className="text-sm text-zinc-600">Type safety en toda la app</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
