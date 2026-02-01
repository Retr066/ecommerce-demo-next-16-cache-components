'use client';

import Link from 'next/link';
import { Store, User, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getUser, logout } from '@/actions/auth';
import { CartButton } from '@/components/cart/cart-button';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser().then((userData) => {
      setUser(userData);
      setLoading(false);
    });
  }, []);

  return (
    <nav className="border-b border-foreground/10 bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Store className="h-6 w-6" />
            <span>TiendaNext</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-foreground/80 transition-colors">
              Inicio
            </Link>
            <Link href="/products" className="hover:text-foreground/80 transition-colors">
              Productos
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <CartButton />

            {!loading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <div className="px-2 py-1.5">
                        <p className="text-sm font-semibold">{user.email}</p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/orders">Mis Pedidos</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => logout()}
                        className="text-red-600 dark:text-red-400"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Cerrar Sesión
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button asChild variant="ghost">
                    <Link href="/login">Iniciar Sesión</Link>
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
