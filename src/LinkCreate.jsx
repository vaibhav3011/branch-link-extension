import React, { Component } from "react";
import { connect } from "react-redux";
import { setLink } from "./actions/actionCreators";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Header from "./components/Header";

const headerString = "Link Creator";

const divStyle = {
	top: "-20px",
	background: "#fff"
};

class LinkCreate extends Component {

	state = {
        flags: {
            link_created: false,
            edit_clicked: false
        },
        linkData: {
            alias: "",
            campaign: "",
            channel: "",
            $desktop_url: "",
            data: [
                {
                    key: "$web_only",
                    val: true
                }
            ]
        }
    };

    updateFormRootInput(event) {
        let linkData = this.state.linkData;
        linkData[event.target.name] = event.target.value;
        this.setState({linkData});
    }

    handleLinkDataUpdate(e) {
        if (e.target.className.indexOf("deeplink") >= 0) {
            let data = this.state.linkData.data;
            data[e.target.dataset.id][e.target.name] = e.target.value;
            let linkData = this.state.linkData;
            linkData.data = data;
            this.setState({linkData});
        } else {
            let linkData = this.state.linkData;
            linkData[e.target.name] = e.target.value;
            this.setState({linkData});
        }
        e.preventDefault();
    }

    saveLink() {
        let linkObj = this.convertDisplayDataToLinkData(this.state.linkData);
        linkObj["branch_key"] = this.props.branchKey;

        axios.post(`https://api.branch.io/v1/url`, linkObj).then(
            res => {
                if (res.data.url) {
                    var flags = this.state.flags;
                    flags.link_created = true;
                    this.setState({flags});
                    this.props.saveBranchLink(res.data.url);
                }
            },
            err => {
                console.log("Link create err");
            }
        );
    }

    updateLinkData() {
        let linkObj = this.convertDisplayDataToLinkData(this.state.linkData);
        linkObj["branch_key"] = this.props.branchKey;
        linkObj["branch_secret"] =
            "secret_live_RrrsLqpzVcoVWf5t4ncQVpzlg2pRpGH9";
        delete linkObj.alias;
        axios
            .put(
                `https://api.branch.io/v1/url?url=${this.props.linkObj.link}`,
                linkObj
            )
            .then(
                res => {
                    if (res.data) {
                        var flags = this.state.flags;
                        flags.edit_clicked = false;
                        this.setState({flags});
                    }
                },
                err => {
                    console.log("Link create err");
                }
            );
    }

    openEditForm() {
        this.fetchLinkAndSetState(this.props.linkObj.link);
        var flags = this.state.flags;
        flags.edit_clicked = true;
        this.setState({flags});
    }

    addDeeplinkData() {
        let linkData = this.state.linkData;
        linkData.data.push({key: "", val: ""});
        this.setState({linkData});
    }

    cancelEditForm() {
        var flags = this.state.flags;
        flags.edit_clicked = false;
        this.setState({flags});
    }

    fetchLinkAndSetState(url) {
        axios
            .get(
                `https://api.branch.io/v1/url?url=${url}&branch_key=${this.props.branchKey}`
            )
            .then(
                res => {
                    const cretedLink = this.convertLinkDataToDisplayData(
                        res.data
                    );
                    let linkData = Object.assign(
                        {},
                        this.state.linkData,
                        cretedLink
                    );
                    this.setState({linkData});
                },
                err => {
                    console.log("Link read err");
                }
            );
    }

    convertLinkDataToDisplayData(linkData) {
        delete linkData.data["+url"];
        delete linkData.data["~creation_source"];
        delete linkData.data["url"];
        delete linkData.data["~id"];

        var keys = Object.keys(linkData.data);
        var displayData = [];
        keys.forEach(key => {
            displayData.push({
                key: key,
                val: linkData.data[key]
            });
        });

        return Object.assign({}, linkData, {data: displayData});
    }

    convertDisplayDataToLinkData(displayData) {
        var apiData = {
            alias: displayData.alias,
            campaign: displayData.campaign,
            channel: displayData.channel,
            data: {}
        };
        displayData.data.forEach(function (obj) {
            if (obj.key && obj.val !== undefined && obj.val !== null) {
                apiData.data[obj.key] = obj.val;
            }
        });
        apiData.data.$desktop_url = displayData.$desktop_url;
        return apiData;
    }

    render() {
        return (
            <div>
                <Header title={headerString}/>

                <div className="col-sm-10 offset-1 p-0 position-relative">
                    <div
                        style={divStyle}
                        className="row col-sm-12 shadow rounded position-absolute p-0 m-0"
                    >
                        <div
                            className="col-sm-5 rounded-left"
                            style={{background: "#fafafa"}}
                        >
                            <div style={{color: "#bdbdbd"}}>Domain</div>
                            <div style={{color: "#0075c9"}}>
                                {this.props.linkObj.domain}
                            </div>
                        </div>
                        <div className="col-sm-7">
                            <div style={{color: "#bdbdbd"}}>Alias</div>
                            <input
                                onChange={this.updateFormRootInput}
                                value={this.state.linkData.alias}
                                type="text"
                                name="alias"
                                className="border-0 bg-white"
                                placeholder="h34jfkd4"
                                disabled={this.state.flags.link_created}
                            />
                        </div>
                    </div>
                </div>

                <div
                    className="col-sm-12 text-center"
                    style={{marginTop: "2.55rem"}}
                ></div>

                <div className="row m-0">
                    {this.state.flags.link_created && (
                        <div
                            className="col-sm-10 offset-sm-1 text-right p-h-m"
                            style={{color: "#757575"}}
                        >
                            <i
                                style={{fontSize: "1.5rem"}}
                                className="fa fa-edit p-w-m cursor-pointer"
                                onClick={() => this.openEditForm()}
                            ></i>

                            <CopyToClipboard
                                text={this.props.linkObj.link}
                                onCopy={() => {
                                    let flags = this.state.flags;
                                    flags.copied = true;
                                    this.setState({flags});
                                    setTimeout(() => {
                                        flags.copied = false;
                                        this.setState({flags});
                                    }, 2000);
                                }}
                            >
                                <i
                                    style={{fontSize: "1.5rem"}}
                                    className="fa fa-copy cursor-pointer"
                                ></i>
                            </CopyToClipboard>
                        </div>
                    )}
                    {this.state.flags.link_created && this.state.flags.copied && (
                        <div className="col-sm-12 text-center">
                            <div className="action-success rounded-pill">
                                <i className="fa fa-check"></i>
                                Link copied successfully
                            </div>
                        </div>
                    )}
                </div>

                <div className="col-sm-10 offset-1">
                    <div className="p-h-sm form-label">Link name</div>
                    <input
                        onChange={this.updateFormRootInput}
                        value={this.state.linkData.$desktop_url}
                        type="url"
                        name="$desktop_url"
                        className="form-control"
                        placeholder="Paste a web url"
                    />
                </div>

                {this.state.flags.edit_clicked && (
                    <div className="row col-sm-10 offset-sm-1 p-0">
                        <div className="col-sm-12 p-h-m">
                            <label className="form-label">Link Alias</label>
                            <input
                                type="text"
                                className="form-control"
                                disabled
                                value={this.props.linkObj.link}
                            />
                        </div>

                        <h5 className="col-sm-12">Analytics Tag</h5>
                        <div className="col-sm-6">
                            <label className="form-label">Channel</label>
                            <input
                                type="text"
                                className="form-control"
                                name="channel"
                                value={this.state.linkData.channel}
                                onChange={this.handleLinkDataUpdate}
                            />
                        </div>

                        <div className="col-sm-6">
                            <label className="form-label">Campaign</label>
                            <input
                                type="text"
                                className="form-control"
                                name="campaign"
                                value={this.state.linkData.campaign}
                                onChange={this.handleLinkDataUpdate}
                            />
                        </div>

                        <h5
                            className="col-sm-12 m-0"
                            style={{
                                paddingTop: "2rem",
                                paddingBottom: "1rem"
                            }}
                        >
                            Deeplink Data
                        </h5>

                        <div class="col-sm-12 row">
                            <div class="col-sm-6 form-label">Key</div>
                            <div class="col-sm-6 p-h-sm form-label">Value</div>
                        </div>

                        {this.state.linkData.data.map((obj, idx) => {
                            let keyId = `key-${idx}`;
                            let valId = `val-${idx}`;

                            return (
                                <div className="row m-0 p-h-sm" key={idx}>
                                    <div className="col-sm-6">
                                        <input
                                            data-id={idx}
                                            name="key"
                                            id={keyId}
                                            type="text"
                                            className="form-control deeplink"
                                            value={obj.key}
                                            onChange={this.handleLinkDataUpdate}
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <input
                                            data-id={idx}
                                            name="val"
                                            id={valId}
                                            type="text"
                                            className="form-control deeplink"
                                            value={obj.val}
                                            onChange={this.handleLinkDataUpdate}
                                        />
                                    </div>
                                </div>
                            );
                        })}

                        <div className="col-sm-12 p-h-sm text-center">
                            <button
                                className="btn btn-outline-info"
                                onClick={() => this.addDeeplinkData()}
                            >
                                Add Deeplink data
                            </button>
                        </div>
                    </div>
                )}

                {this.state.flags.edit_clicked && (
                    <div className="col-sm-10 offset-sm-1 text-right p-h-m">
                        <button
                            className="btn btn-outline-primary rounded-pill p-w-m"
                            onClick={this.cancelEditForm}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={this.updateLinkData}
                            style={{marginLeft: "20px"}}
                            className="btn btn-primary rounded-pill p-w-m"
                        >
                            Save Link
                        </button>
                    </div>
                )}

                {!this.state.flags.link_created && (
                    <div className="col-sm-10 offset-sm-1 text-right p-h-m">
                        <button className="btn btn-outline-primary rounded-pill p-w-m">
                            Cancel
                        </button>
                        <button
                            onClick={this.saveLink}
                            style={{marginLeft: "20px"}}
                            className="btn btn-primary rounded-pill p-w-m"
                            disabled={
                                !this.state.linkData.alias ||
                                !this.state.linkData.$desktop_url
                            }
                        >
                            Save Link
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
	return { ...state };
};

const mapDispatchToProps = dispatch => ({
	saveBranchLink(link) {
		dispatch(setLink(link));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LinkCreate);
