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

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	deleteItemFromCart: () => {},
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);

	const addItemToCart = productToAdd => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	const count = useMemo(() => {
		return cartItems.reduce((total, cartItem) => {
			return (total += cartItem.quantity);
		}, 0);
	}, [cartItems]);

	const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, count };

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
