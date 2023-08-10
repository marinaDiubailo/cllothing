import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	count: 0,
	total: 0,
};
const CART_ACTION_TYPES = {
	SET_CART_ITEMS: 'SET_CART_ITEMS',
	SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const addCartItem = (cartItems, productToAdd) => {
	const foundItem = cartItems.find(item => item.id === productToAdd.id);

	if (foundItem) {
		return cartItems.map(item =>
			item.id === productToAdd.id
				? { ...item, quantity: item.quantity + 1 }
				: item
		);
	}

	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const deleteCartItem = (cartItems, cartItemToDelete) => {
	const foundItem = cartItems.find(item => item.id === cartItemToDelete.id);

	if (foundItem.quantity === 1) {
		return cartItems.filter(item => item.id !== foundItem.id);
	}

	return cartItems.map(item =>
		item.id === foundItem.id ? { ...item, quantity: item.quantity - 1 } : item
	);
};

const clearCartItem = (cartItems, cartItemToClear) => {
	return cartItems.filter(item => item.id !== cartItemToClear.id);
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	deleteItemFromCart: () => {},
	clearItemFromCart: () => {},
	count: 0,
	total: 0,
});

const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				...payload,
			};
		case CART_ACTION_TYPES.SET_IS_CART_OPEN:
			return {
				...state,
				isCartOpen: payload,
			};
		default:
			throw new Error(`Unhandled type ${type} in cartRedicer`);
	}
};

export const CartProvider = ({ children }) => {
	const [{ cartItems, isCartOpen, count, total }, dispatch] = useReducer(
		cartReducer,
		INITIAL_STATE
	);

	const updateCartItems = newCartItems => {
		const newCartCount = newCartItems.reduce((total, cartItem) => {
			return (total += cartItem.quantity);
		}, 0);

		const newTotal = newCartItems.reduce((cartTotal, cartItem) => {
			return (cartTotal += cartItem.quantity * cartItem.price);
		}, 0);

		dispatch(
			createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
				cartItems: newCartItems,
				total: newTotal,
				count: newCartCount,
			})
		);
	};

	const addItemToCart = productToAdd => {
		const newCartItems = addCartItem(cartItems, productToAdd);
		updateCartItems(newCartItems);
	};

	const deleteItemFromCart = cartItemToDelete => {
		const newCartItems = deleteCartItem(cartItems, cartItemToDelete);
		updateCartItems(newCartItems);
	};

	const clearItemFromCart = cartItemToClear => {
		const newCartItems = clearCartItem(cartItems, cartItemToClear);
		updateCartItems(newCartItems);
	};

	const setIsCartOpen = bool => {
		dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		deleteItemFromCart,
		clearItemFromCart,
		cartItems,
		count,
		total,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
