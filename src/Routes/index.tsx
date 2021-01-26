import { Switch, Route, Redirect } from 'react-router-dom';

import Home from 'pages/Home';

function Routes() {
  return (
    <Switch>
      <Route exact path="/(breweries|)" component={Home} />
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
