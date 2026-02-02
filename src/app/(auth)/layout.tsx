import { GuestRoute } from '@/components/auth/guest-route';
import { Suspense } from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Cargando formulario...</div>}>
    <GuestRoute>
      <div className="min-h-screen flex items-center justify-center p-4">
        {children}
      </div>
    </GuestRoute>
    </Suspense>
  );
}
