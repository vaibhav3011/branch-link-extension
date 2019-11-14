import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
	render() {
		return (
			<div className="App-header">
				<div className="row m-sm-0 p-sm-3">
					<div className="col-sm-6 p-sm-0">
						<img
							alt="Brand"
							src="./logo-white.svg"
							className="App-logo"
						/>
					</div>
					<div className="col-sm-6 p-sm-0 text-right">
						{!!this.props.branchKey && (
							<Link to="/change-key" style={{ color: "#ffffff" }}>
								<span>CHANGE KEY</span>
							</Link>
						)}

						<span className="p-w-sm">|</span>

						<a
							style={{ color: "#ffffff" }}
							href="https://docs.branch.io/links/integrate/"
							target="_blank" rel="noopener noreferrer"
						>
							<span>HELP</span>
						</a>
					</div>
					<div className="col-sm-12 p-sm-5 h1 font-weight-light text-center">
						{this.props.title}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { ...state };
};

export default connect(mapStateToProps)(Header);
