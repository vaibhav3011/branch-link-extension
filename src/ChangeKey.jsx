import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { addBranchKey, setLinkDomain } from "./actions/actionCreators";
import Header from "./components/Header";

const headerString = "Change Branch Key";

class ChangeKey extends Component {
	constructor(props) {
		super(props);
		this.state = { branchKey: props.branchKey };
		this.saveKeyAndGoToLinkCreate = this.saveKeyAndGoToLinkCreate.bind(
			this
		);
		this.cancelChangeKey = this.cancelChangeKey.bind(this);
		this.handleBranchKeyInputChange = this.handleBranchKeyInputChange.bind(
			this
		);
	}

	// To validate key, create blank link with this key and if successful, use the domain
	saveKeyAndGoToLinkCreate() {
		var body = {
			branch_key: this.state.branchKey
		};
		axios.post(`https://api.branch.io/v1/url`, body).then(res => {
			const urlArr = res.data.url.split("/");
			const urlObj = {
				domain: urlArr[urlArr.length - 2]
			};
			this.props.saveBranchKey(this.state.branchKey);
			this.props.setDomain(urlObj);
			this.setState({ createKeySuccess: true });
			setTimeout(() => {
				this.props.history.push("/link-create");
			}, 2000);
		}, err => {
			this.setState({createKeyFail : true});
            setTimeout(() => {
                this.setState({createKeyFail : false});
            }, 2000);
		});
	}

	handleBranchKeyInputChange(event) {
		this.setState({ branchKey: event.target.value });
	}

    cancelChangeKey() {
        this.props.history.push("/link-create");
	}

	render() {
		return (
			<div>
				<Header title={headerString} />
				<div className="col-sm-10 offset-1 p-0 position-relative">
					<input
						onChange={this.handleBranchKeyInputChange}
						value={this.state.branchKey}
						style={{ top: "-20px" }}
						type="text"
						name="branch-key"
						className="form-control position-absolute text-center"
						placeholder="Place your public Branch key (key_live_...)"
					/>
				</div>

				<div className="col-sm-12 text-center p-h-xl">
					{this.state.createKeySuccess && (
						<div className="action-success rounded-pill">
							<i className="fa fa-check"></i>
							Key successfully updated
						</div>
					)}
				</div>

                <div className="col-sm-12 text-center p-h-sm" style={{color : 'red'}}>
                    {this.state.createKeyFail && (
						<span>Invalid branch key</span>
                    )}
                </div>

				<div className="col-sm-12 text-right p-h-m">
					<button className="btn btn-outline-primary rounded-pill p-w-m" onClick={this.cancelChangeKey}>
						Cancel
					</button>
					<button
						onClick={this.saveKeyAndGoToLinkCreate}
						style={{ marginLeft: "20px" }}
						className="btn btn-primary rounded-pill p-w-m"
						disabled={!this.state.branchKey}
					>
						Save key
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { ...state };
};
const mapDispatchToProps = (dispatch) => ({
	saveBranchKey(key) {
		dispatch(addBranchKey(key));
	},
	setDomain(obj) {
		dispatch(setLinkDomain(obj));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChangeKey);
