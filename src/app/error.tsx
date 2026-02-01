'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Algo salió mal</h2>
        <p className="text-foreground/60">
          Ocurrió un error inesperado. Por favor, intenta de nuevo.
        </p>
        <Button onClick={() => reset()}>Intentar de nuevo</Button>
      </div>
    </div>
  );
}
