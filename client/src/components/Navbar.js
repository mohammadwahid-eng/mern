import React, {Component} from 'react';
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/Auth/AuthActions";

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick = event => {
		event.preventDefault();
		this.props.logout(this.props.history);
	}

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
								<li className="nav-item"><NavLink to="/logout" className="nav-link" onClick={this.handleClick}>Logout</NavLink></li>
							</ul>
						</div>
					</div>
				</nav>
			</React.Fragment>
		);
	}
}

export default connect(null, { logout })(Navbar);