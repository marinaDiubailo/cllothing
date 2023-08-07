import { createContext, useState, useMemo } from 'react';

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

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);

	const addItemToCart = productToAdd => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	const deleteItemFromCart = cartItemToDelete => {
		setCartItems(deleteCartItem(cartItems, cartItemToDelete));
	};

	const clearItemFromCart = cartItemToClear => {
		setCartItems(clearCartItem(cartItems, cartItemToClear));
	};

	const count = useMemo(() => {
		return cartItems.reduce((total, cartItem) => {
			return (total += cartItem.quantity);
		}, 0);
	}, [cartItems]);

	const total = useMemo(() => {
		return cartItems.reduce((cartTotal, cartItem) => {
			return (cartTotal += cartItem.quantity * cartItem.price);
		}, 0);
	}, [cartItems]);

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
