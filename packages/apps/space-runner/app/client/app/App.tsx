import { BrowserRouter, Routes } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';

import { Pages } from '@client/pages';
import { createStore } from '@client/shared/store';

import '@client/shared/styles/index.scss';

const store = createStore();

export function App() {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <Routes>{Pages}</Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
