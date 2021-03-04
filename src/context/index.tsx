import { ReactNode } from 'react';
import { AuthContextProvider } from './auth-context';
import { QueryClientProvider, QueryClient } from 'react-query';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </QueryClientProvider>
  );
};
