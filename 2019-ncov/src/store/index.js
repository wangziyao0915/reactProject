import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers/index.js';
import mySagas from './sagas/index.js';

const sagaMiddleware = createSagaMiddleware();

const middleware = [applyMiddleware(sagaMiddleware)];

const store = createStore(reducer, compose(...middleware));

sagaMiddleware.run(mySagas);

export default store;