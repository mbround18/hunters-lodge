import { Home } from './components/home';
import { RouteProps } from 'react-router';
import { WorldMap } from './views/worldMap';

export const routes: RouteProps[] = [
  { path: '/', component: Home, exact: true },
  { path: '/map/', component: WorldMap }
];
