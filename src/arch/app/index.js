import React                from 'react';
import ReactDOM             from 'react-dom';
// import injectTpEventPlugin  from 'react-tap-event-plugin';
import { Routes }           from './routes/Routes.js';
// import { Routes }           from './routes/Routes.jsx';

import Ep from 'es6-promise';
import 'isomorphic-fetch';
import 'babel-polyfill';
import 'webpack-zepto';
import 'swiper';

import '../assets/adaptive.js';
import '../assets/c2p.js';
import './style/index.style.scss';

Ep.polyfill();

const ELEMENT_ROOT  = 'root';
const RootElement    = document.getElementById(ELEMENT_ROOT);

ReactDOM.render(<Routes />, RootElement);
