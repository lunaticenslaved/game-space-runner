import { BrowserRouter, Routes } from 'react-router-dom';

import { Pages } from '@client/pages';

import '@client/shared/styles/index.scss';

export function App() {
  return (
    <BrowserRouter>
      <Routes>{Pages}</Routes>
    </BrowserRouter>
  );
}
