import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			error: {}
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = event => {
		event.preventDefault();
	}

	render() {
		let { email, password, error } = this.state;
		return (
			<React.Fragment>
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-6 py-5">
							<h4 className="mb-4">Login Form</h4>
							<form autoComplete="off" onSubmit={this.handleSubmit}>
								<div className="form-floating mb-3">
									<input type="email" className="form-control" id="email" name="email" placeholder="Your email" value={email} onChange={this.handleChange}/>
									<label htmlFor="email">Email address</label>
								</div>
								<div className="form-floating mb-3">
									<input type="password" className="form-control" id="password" name="password" placeholder="Your Password" value={password} onChange={this.handleChange}/>
									<label htmlFor="password">Password</label>
								</div>
								<div className="row align-items-center">
									<div className="col-auto">
										<button type="submit" className="btn btn-primary">Login Now</button>
									</div>
									<div className="col text-lg-end">
										<p className="m-0">Do not have an account? <Link to="/registration">Create now</Link></p>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Login;