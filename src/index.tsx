import React from 'react';
import ReactDOM from 'react-dom';
import 'modern-normalize';
import './style/index.scss';
import RouteSwitch from './RouteSwitch';

ReactDOM.render(
  <React.StrictMode>
    <RouteSwitch />
  </React.StrictMode>,
  document.getElementById('root'),
);
