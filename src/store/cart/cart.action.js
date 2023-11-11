// import { CART_ACTION_TYPES } from './cart.types';
// import { createAction } from '../../utils/reducer/reducer.utils';

export const addCartItem = (cartItems, productToAdd) => {
    const foundItem = cartItems.find((item) => item.id === productToAdd.id);

    if (foundItem) {
        return cartItems.map((item) =>
            item.id === productToAdd.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
        );
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const deleteCartItem = (cartItems, cartItemToDelete) => {
    const foundItem = cartItems.find((item) => item.id === cartItemToDelete.id);

    if (foundItem.quantity === 1) {
        return cartItems.filter((item) => item.id !== foundItem.id);
    }

    return cartItems.map((item) =>
        item.id === foundItem.id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
    );
};

export const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((item) => item.id !== cartItemToClear.id);
};

// export const setIsCartOpen = bool =>
// 	createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

// export const addItemToCart = (cartItems, productToAdd) => {
// 	const newCartItems = addCartItem(cartItems, productToAdd);
// 	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
// };

// export const deleteItemFromCart = (cartItems, cartItemToDelete) => {
// 	const newCartItems = deleteCartItem(cartItems, cartItemToDelete);
// 	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
// };

// export const clearItemFromCart = (cartItems, cartItemToClear) => {
// 	const newCartItems = clearCartItem(cartItems, cartItemToClear);
// 	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
// };
