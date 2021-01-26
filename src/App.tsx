import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import Base from 'layouts/BaseLayout';
import Routes from 'Routes';

function App() {
  return (
    <>
      <CssBaseline />

      <Base>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Base>
    </>
  );
}

export default App;
