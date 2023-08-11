import { createSelector } from 'reselect';

const selectCartReducer = state => state.cartReducer;

export const selectCartItems = createSelector(
	[selectCartReducer],
	cartSlice => cartSlice.cartItems
);

export const selectIsCartOpen = createSelector(
	[selectCartReducer],
	cartSlice => cartSlice.isCartOpen
);

export const selectCartCount = createSelector([selectCartItems], cartItems =>
	cartItems.reduce((total, cartItem) => {
		return (total += cartItem.quantity);
	}, 0)
);

export const selectCartTotal = createSelector([selectCartItems], cartItems =>
	cartItems.reduce((cartTotal, cartItem) => {
		return (cartTotal += cartItem.quantity * cartItem.price);
	}, 0)
);
