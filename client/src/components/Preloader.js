import React, {Component} from 'react';
import './Preloader.css'

class Preloader extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="preloader">
					<div className="d-flex justify-content-center h-100 align-items-center">
						<span className="spinner-grow text-dark"/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Preloader;