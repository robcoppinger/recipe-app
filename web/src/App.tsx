import './css/base.css';
import './css/themes.css';
import { Home } from './screens/home';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Register } from './screens/register';
import { Login } from './screens/login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
