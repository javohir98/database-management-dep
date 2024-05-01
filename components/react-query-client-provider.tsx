'use client';

import { showNotification } from '@mantine/notifications';
import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const ReactQueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  const mutationCache = new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.options.onError) return;
      if (!(error instanceof Error)) return;

      showNotification({ message: error instanceof Error ? error.message : error, color: 'red' });
    },
  });

  const queryClient = new QueryClient({ mutationCache });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
