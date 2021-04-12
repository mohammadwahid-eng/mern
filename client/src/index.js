import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from './store';
import { setuser } from "./store/Auth/AuthSlice";
import jwtDecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

const AUTH_TOKEN = localStorage.getItem("AUTH_TOKEN");
if (AUTH_TOKEN) {
	let user = jwtDecode(AUTH_TOKEN);
	setAuthToken(AUTH_TOKEN);
	store.dispatch(setuser({
		user: user,
		error: {}
	}));
}

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
