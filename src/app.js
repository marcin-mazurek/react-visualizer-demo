import App from './components/App';
import React from 'react';
import ReactDOM from 'react-dom';

var appComponent = React.createElement(App, {});
ReactDOM.render(appComponent, document.getElementById("app"));
