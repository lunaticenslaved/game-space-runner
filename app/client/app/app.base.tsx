import { QueryClient, QueryClientProvider } from 'react-query';
import { Routes } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';

import { Pages } from '@client/pages';
import { RootStore } from '@client/shared/store';

import '@client/shared/styles/index.scss';

const queryClient = new QueryClient();

export type AppProps = {
  store: RootStore;
};

export function App({ store }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider store={store}>
        <Routes>{Pages}</Routes>
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;
