import { BrowserRouter } from 'react-router-dom';

import { ThemeContextProvider } from '@libs/uikit/theme';

import { App as AppBase, AppProps } from './app.base';

import '@client/shared/styles/index.scss';

export function App(props: AppProps) {
  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <AppBase {...props} />
      </BrowserRouter>
    </ThemeContextProvider>
  );
}

export default App;
