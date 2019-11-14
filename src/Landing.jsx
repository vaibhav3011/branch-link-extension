import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "./actions/actionCreators";

class Landing extends Component {
	componentDidMount() {
		if (this.props.isLoggedIn) {
			this.props.history.push("/add-key");
		}
	}

	onDashboardLoginClick = () => {
		this.props.userLogin();
		this.props.history.push("/add-key");
	};
	render() {
		return (
			<div className="p-sm-2">
				<div className="col-sm-12 p-sm-3">
					<img
						alt="Brand"
						src="./logo-black.svg"
						className="App-logo"
					/>
				</div>
				<div className="col-sm-8 offset-sm-2">
					<img
						alt="Landing"
						src="./landing.svg"
						className="w-100 App-landing-img"
					/>
				</div>
				<h3 className="col-sm-12 text-center">Branch Link Creator</h3>

				<div className="col-sm-12 p-sm-3 text-center">
					Branch links are mobile-optimized, marketing links they help
					you understand the source of your traffic and deliver the
					best user experience
				</div>

				<div className="col-sm-12 p-sm-3 text-center">
					<button
						className="btn btn-primary rounded-pill p-w-lg"
						onClick={this.onDashboardLoginClick}
					>
						Dashboard Login
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { isLoggedIn: state.isLoggedIn };
};
const mapDispatchToProps = dispatch => ({
	userLogin() {
		dispatch(login());
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Landing);
