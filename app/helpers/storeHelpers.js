import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '@app/reducers/rootReducer';

const enhancer = composeWithDevTools({ name: 'DCApp' })(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);
