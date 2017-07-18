import React            from 'react';
import {
  Router,
  Route,
  IndexRoute,
  // hashHistory,
  // useRouterHistory,
  browserHistory
}                         from 'react-router';

import App                from './App.jsx';
import Home from '../views/home/route';



export const routes = [
    {
        path: '/',
        component: App,
        indexRoute: Home(),
        childRoutes: [
            // Charge(),//充值
        ]
    }
];

export const Routes = () => {
    return (
        <Router history={browserHistory}>
            {routes}
        </Router>
    );
};
