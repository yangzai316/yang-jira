import { AuthContextProvider } from './auth-context';
import { QueryClientProvider, QueryClient } from 'react-query';

export const AppProvider = ({ children }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </QueryClientProvider>
  );
};
