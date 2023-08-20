import { BrowserRouter } from 'react-router-dom';
import { Router } from './router';

import '@client/shared/styles/index.scss';

export function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
