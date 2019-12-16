import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { App } from './components/App';
import { reducers } from './reducers';

const middleware: any = [thunk];

const isProduction: boolean = process.env.NODE_ENV === 'production';

if (!isProduction) {
  middleware.push(logger);
}

const store = isProduction
  ? createStore(reducers, applyMiddleware(...middleware))
  : createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
