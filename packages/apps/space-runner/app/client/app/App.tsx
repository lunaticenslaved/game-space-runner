import { BrowserRouter, Routes } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';

import { Pages } from '@client/pages';
import { RootStore } from '@client/shared/store';

import '@client/shared/styles/index.scss';

export type AppProps = {
  store: RootStore;
};

export function App({ store }: AppProps) {
  return (
    <BrowserRouter>
      <StoreProvider store={store}>
        <Routes>{Pages}</Routes>
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;
