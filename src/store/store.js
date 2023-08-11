import {
	compose,
	legacy_createStore as createStore,
	applyMiddleware,
} from 'redux';
// import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

const loggerMiddleware = store => next => action => {
	if (!action.type) {
		return next(action);
	}

	console.log('type: ', action.type);
	console.log('payload: ', action.payload);
	console.log('currentState: ', store.getState());

	next(action);

	console.log('next: ', store.getState());
};

const middleWares = [loggerMiddleware];
const composedEnhancers = compose(
	applyMiddleware(...middleWares),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const store = createStore(rootReducer, {}, composedEnhancers);
