import '../App.css';
import {Router , Switch} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import {PublicRoute, PrivateRoute} from '../features'
import {Login, Signup , Profile, _404, Home, Requests} from '../Pages'
function App() {
  const history = createBrowserHistory()
  return (
      <Router history={history}>
        <Switch>
          <PublicRoute component={Login} exact path='/' />
          <PublicRoute component={Signup} path='/signup' />
          <PrivateRoute component={Profile} path='/profile' />
          <PrivateRoute component={Home} path='/home' />
          <PrivateRoute component={Requests} path='/requests' />
          <PrivateRoute component={_404} exact path='**' />
        </Switch>
      </Router>

    );
}

export default App;
