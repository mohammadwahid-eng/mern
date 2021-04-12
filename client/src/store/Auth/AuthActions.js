import axios from 'axios';
import jwtDecode from "jwt-decode";
import { setuser, seterror } from "./AuthSlice";
import setAuthToken from "../../utils/setAuthToken";

const errors = err => {
	let items = {};
	err.response.data.forEach(item => {
		let { field, message } = item;
		items[field] = message;
	});
	return items;
}

export const login = (user, history) => dispatch => {
	axios.post("/users/login", user)
		.then(response => {
			let AUTH_TOKEN 	= response.data,
				user  		= jwtDecode(AUTH_TOKEN);
			localStorage.setItem("AUTH_TOKEN", AUTH_TOKEN);
			setAuthToken(AUTH_TOKEN);
			dispatch(setuser({
				user: user,
				error: {}
			}));
			history.push("/");
		})
		.catch(response => {
			dispatch(seterror({
				error: errors(response)
			}));
		});
}


export const registration = (user, history) => dispatch => {
	axios.post("/users/registration", user)
		.then(response => {
			dispatch(seterror({
				error: {}
			}));
			history.push("/login");
		})
		.catch(response => {
			dispatch(seterror({
				error: errors(response)
			}));
		});
}

export const logout = history => dispatch => {
	localStorage.removeItem("AUTH_TOKEN");
	dispatch(setuser({
		user: {},
		error: {}
	}));
	history.push("/login");
}
