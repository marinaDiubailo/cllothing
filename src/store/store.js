import {
	compose,
	legacy_createStore as createStore,
	applyMiddleware,
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

// const loggerMiddleware = store => next => action => {
// 	if (!action.type) {
// 		return next(action);
// 	}

// 	console.log('type: ', action.type);
// 	console.log('payload: ', action.payload);
// 	console.log('currentState: ', store.getState());

// 	next(action);

// 	console.log('next: ', store.getState());
// };

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['userReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
	Boolean
); // в режиме продакшн .filter(Boolean) вернет []

const composeEnhancer =
	(process.env.NODE_ENV === 'development' &&
		window &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, {}, composedEnhancers);

export const persistor = persistStore(store);

//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
