import * as React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { routes } from './routes';
import { easyKey } from './utils/easyKey';
import './app.scss';

export class App extends React.Component {
  render() {
    return (
      <Router>
        <div id="nav">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/map/">World Map</Link>
              </li>
            </ul>
          </nav>
          {routes &&
            routes.map(route => <Route key={easyKey(route)} {...route} />)}
        </div>
      </Router>
    );
  }
}
