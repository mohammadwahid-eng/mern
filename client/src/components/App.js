import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Navbar from "./Navbar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Navbar />
				<Switch>
					<Route path="/registration" component={Registration}/>
					<Route path="/login" component={Login}/>
					<Route exact path="/" component={Home}/>
				</Switch>
			</React.Fragment>
		);
	}
}

export default App;