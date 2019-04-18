import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { createHashHistory } from 'history';
import logger from 'redux-logger';
import rootReducer from './reducers';
import rootSaga from './sagas';

const browserHistory = createHashHistory();
const middleware = routerMiddleware(browserHistory);
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware, logger, middleware))
);
sagaMiddleware.run(rootSaga);

export const history = syncHistoryWithStore(browserHistory, store);
export default store;
