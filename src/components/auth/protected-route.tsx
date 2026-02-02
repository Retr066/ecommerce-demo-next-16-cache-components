import { redirect } from 'next/navigation';
import { getUser } from '@/actions/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export async function ProtectedRoute({ children, redirectTo = '/login' }: ProtectedRouteProps) {
  const user = await getUser();

  if (!user) {
    redirect(redirectTo);
  }

  return <>{children}</>;
}
