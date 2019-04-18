
import React from 'react';//eslint-disable-line
import DOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Main from './src/Main';

DOM.render(
  <Provider store={store}>
    <Main/>
  </Provider>, document.getElementById('app')
);
