import { redirect } from 'next/navigation';
import { getUser } from '@/actions/auth';

interface GuestRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * Componente para rutas que solo deben ser accesibles cuando NO estás autenticado
 * (como login y register). Si estás autenticado, te redirige al home.
 */
export async function GuestRoute({ children, redirectTo = '/' }: GuestRouteProps) {
  const user = await getUser();

  // Si ya estás autenticado, redirige al home
  if (user) {
    redirect(redirectTo);
  }

  return <>{children}</>;
}
