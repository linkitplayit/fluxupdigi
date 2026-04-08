'use client';

import { useEffect } from 'react';
import { Button } from '@/src/components/ui/Button';

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
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Something went wrong!</h2>
        <p className="text-gray-400 mb-8">{error.message}</p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}