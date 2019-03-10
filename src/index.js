import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { combineReducers, createStore } from 'redux';
import { routerReducer } from 'react-router-redux';
import { App } from 'components';
import * as reducers from 'reducers';
import './index.scss';

const store = createStore(combineReducers({ ...reducers, routing: routerReducer }));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
