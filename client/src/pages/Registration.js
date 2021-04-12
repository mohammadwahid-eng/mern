import React, {Component} from 'react';
import Preloader from "../components/Preloader";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registration } from "../store/Auth/AuthActions";

class Registration extends Component {
	constructor(props) {
		super(props);
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/");
		}
		this.state = {
			name: "",
			email: "",
			password: "",
			confirmPassword: ""
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleSubmit = event => {
		event.preventDefault();
		let { name, email, password, confirmPassword } = this.state;
		this.props.registration({ name, email, password, confirmPassword }, this.props.history);
	}

	render() {
		let { name, email, password, confirmPassword } = this.state;
		let { error } = this.props.auth;
		return (
			<React.Fragment>
				<div className="container">
					<div className="row justify-content-center align-items-center vh-100">
						<div className="col-lg-5">
							<h4 className="mb-4 text-center">Registration Form</h4>
							<form onSubmit={this.handleSubmit}>
								<div className="form-floating mb-3">
									<input
										type="text"
										className={error.name ? "form-control is-invalid" : "form-control"}
										id="name"
										name="name"
										placeholder="Your Name"
										value={name}
										onChange={this.handleChange}
									/>
									{ error.name && <div className="invalid-feedback">{ error.name }</div> }
									<label htmlFor="name">Name</label>
								</div>
								<div className="form-floating mb-3">
									<input
										type="email"
										className={error.email ? "form-control is-invalid" : "form-control"}
										id="email"
										name="email"
										placeholder="Your email"
										value={email}
										onChange={this.handleChange}
									/>
									{ error.email && <div className="invalid-feedback">{ error.email }</div> }
									<label htmlFor="email">Email address</label>
								</div>
								<div className="form-floating mb-3">
									<input
										type="password"
										className={error.password ? "form-control is-invalid" : "form-control"}
										id="password"
										name="password"
										placeholder="Your Password"
										value={password}
										onChange={this.handleChange}
									/>
									{ error.password && <div className="invalid-feedback">{ error.password }</div> }
									<label htmlFor="password">Password</label>
								</div>
								<div className="form-floating mb-3">
									<input
										type="password"
										className={error.confirmPassword ? "form-control is-invalid" : "form-control"}
										id="confirmPassword"
										name="confirmPassword"
										placeholder="Confirm Your Password"
										value={confirmPassword}
										onChange={this.handleChange}
									/>
									{ error.confirmPassword && <div className="invalid-feedback">{ error.confirmPassword }</div>}
									<label htmlFor="confirmPassword">Confirm Password</label>
								</div>

								<div className="d-grid mb-2">
									<button type="submit" className="btn btn-primary btn-block py-2">Register Now</button>
								</div>
								<p className="m-0 text-center">Already have an account? <Link to="/login">Login now</Link></p>
							</form>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, { registration })(Registration);