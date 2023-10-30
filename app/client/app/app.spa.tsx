import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';

import { theme } from '@client/app/theme';

import { App as AppBase, AppProps } from './app.base';

import '@client/shared/styles/index.scss';

export function App(props: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppBase {...props} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
