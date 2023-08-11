import {
	compose,
	legacy_createStore as createStore,
	applyMiddleware,
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
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

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['userReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [loggerMiddleware];
const composedEnhancers = compose(
	applyMiddleware(...middleWares),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const store = createStore(persistedReducer, {}, composedEnhancers);

export const persistor = persistStore(store);
