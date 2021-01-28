import { Switch, Route, Redirect } from 'react-router-dom';

import Home from 'pages/Home';
import Details from 'pages/Details';

function Routes() {
  return (
    <Switch>
      <Route exact path="/(breweries|)" component={Home} />
      <Route exact path="/breweries/:id" component={Details} />
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
