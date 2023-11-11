import { createSlice } from '@reduxjs/toolkit';
// import { CART_ACTION_TYPES } from './cart.types';
import { addCartItem, deleteCartItem, clearCartItem } from './cart.action';

const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
};

// export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
//     const { type, payload } = action;

//     switch (type) {
//         case CART_ACTION_TYPES.SET_CART_ITEMS:
//             return {
//                 ...state,
//                 cartItems: payload,
//             };
//         case CART_ACTION_TYPES.SET_IS_CART_OPEN:
//             return {
//                 ...state,
//                 isCartOpen: payload,
//             };
//         default:
//             return state;
//     }
// };

const cartSlice = createSlice({
    name: 'cart',
    initialState: CART_INITIAL_STATE,
    reducers: {
        setIsCartOpen: (state, { payload }) => {
            state.isCartOpen = payload;
        },
        addItemToCart: (state, { payload }) => {
            state.cartItems = addCartItem(state.cartItems, payload);
        },
        deleteItemFromCart: (state, { payload }) => {
            state.cartItems = deleteCartItem(state.cartItems, payload);
        },
        clearItemFromCart: (state, { payload }) => {
            state.cartItems = clearCartItem(state.cartItems, payload);
        },
    },
});

export const cartReducer = cartSlice.reducer;
export const {
    setIsCartOpen,
    addItemToCart,
    deleteItemFromCart,
    clearItemFromCart,
} = cartSlice.actions;
