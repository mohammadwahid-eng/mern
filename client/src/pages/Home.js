import React, {Component} from 'react';
import { connect } from 'react-redux';
import Navbar from "../components/Navbar";

class Home extends Component {
	constructor(props) {
		super(props);
		if (!this.props.auth.isAuthenticated) {
			this.props.history.push("/login");
		}
	}


	render() {
		console.log(this.props)
		return (
			<React.Fragment>
				<Navbar history={this.props.history}/>
				<h4>This is homepage</h4>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps)(Home);