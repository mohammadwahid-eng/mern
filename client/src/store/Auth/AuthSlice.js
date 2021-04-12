import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
	name: 'auth',
	initialState: {
		isAuthenticated: false,
		user: {},
		error: {}
	},
	reducers: {
		setuser: (state, action) => {
			state.isAuthenticated = Object.keys(action.payload.user).length !== 0;
			state.user = action.payload.user;
			state.error = action.payload.error;
		},
		seterror: (state, action) => {
			state.error = action.payload.error;
		}
	}
});

export const { setuser, seterror } = AuthSlice.actions;

export default AuthSlice.reducer;