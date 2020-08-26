import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';

export const configureStore = () => {
  const middlewares = [];
  return createStore(rootReducer, applyMiddleware(...middlewares));
};
