import React, {Component} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/registration" component={Registration}/>
					<Route path="/login" component={Login}/>
					<Route exact path="/" component={Home}/>
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;