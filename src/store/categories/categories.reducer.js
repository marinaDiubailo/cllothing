import { createSlice } from '@reduxjs/toolkit';
// import { CATEGORIES_ACTION_TYPES } from './categories.types';

const INITIAL_CATEGORIES_STATE = {
    categories: [],
};

// export const categoriesReducer = (
//     state = INITIAL_CATEGORIES_STATE,
//     action = {},
// ) => {
//     const { type, payload } = action;

//     switch (type) {
//         case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
//             return {
//                 ...state,
//                 categories: payload,
//             };
//         default:
//             return state;
//     }
// };

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: INITIAL_CATEGORIES_STATE,
    reducers: {
        setCategories: (state, { payload }) => {
            state.categories = payload;
        },
    },
});

export const categoriesReducer = categoriesSlice.reducer;
export const { setCategories } = categoriesSlice.actions;
