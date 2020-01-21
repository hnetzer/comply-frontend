import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

import { loadState, saveState } from './localStorage'

const store =  createStore(
 rootReducer,
 loadState(),
 applyMiddleware(thunk)
);

store.subscribe(() => {
  saveState(store.getState());
});

export {
  store
}
