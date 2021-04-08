import React, {Component} from 'react';
import {Link, NavLink} from "react-router-dom";

class Navbar extends Component {
	render() {
		return (
			<React.Fragment>
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
					<div className="container">
						<Link to="/" className="navbar-brand">Navbar</Link>
						<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
							<span className="navbar-toggler-icon"/>
						</button>
						<div className="collapse navbar-collapse" id="menu">
							<ul className="navbar-nav ms-auto">
								<li className="nav-item"><NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink></li>
								<li className="nav-item"><NavLink to="/registration" className="nav-link" activeClassName="active">Registration</NavLink></li>
								<li className="nav-item"><NavLink to="/logout" className="nav-link" activeClassName="active">Logout</NavLink></li>
							</ul>
						</div>
					</div>
				</nav>
			</React.Fragment>
		);
	}
}

export default Navbar;