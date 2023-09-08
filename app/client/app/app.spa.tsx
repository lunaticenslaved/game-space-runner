import { BrowserRouter } from 'react-router-dom';

import { App as AppBase, AppProps } from './app.base';

import '@client/shared/styles/index.scss';

export function App(props: AppProps) {
  return (
    <BrowserRouter>
      <AppBase {...props} />
    </BrowserRouter>
  );
}

export default App;
