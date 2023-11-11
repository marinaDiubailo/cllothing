import { createSlice } from '@reduxjs/toolkit';
// import { USER_ACTION_TYPES } from './user.types';

const INITIAL_STATE = {
    currentUser: null,
};

// export const userReducer = (state = INITIAL_STATE, action) => {
// 	const { type, payload } = action;

// 	switch (type) {
// 		case USER_ACTION_TYPES.SET_CURRENT_USER:
// 			return {
// 				...state,
// 				currentUser: payload,
// 			};
// 		default:
// 			return state;
// 	}
// };

const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        setCurrentUser: (state, { payload }) => {
            state.currentUser = payload;
        },
    },
});

export const { setCurrentUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
