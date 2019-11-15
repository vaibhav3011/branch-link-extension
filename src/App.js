import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import Landing from "./components/Landing";
import AddChangeKey from "./components/AddChangeKey";
import LinkCreate from "./components/LinkCreate";
import "./App.css";
import "./common.css";
import { addBranchKey, login, setLinkObject } from "./actions/actionCreators";
import { loadState } from "./storage";

const FourOhFour = () => <h1>404</h1>;

class App extends Component {
    componentDidMount() {
        loadState()
            .then(res => {
                this.props.overrideState(res);
                if (this.props.isLoggedIn) {
                    if (!!this.props.branchKey) {
                        this.props.history.push("/link-create");
                    } else {
                        this.props.history.push("/add-key");
                    }
                }
            })
            .catch(err => {
            });
    }

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Landing}/>
                    <ProtectedRoute
                        path="/add-key"
                        component={(props) => <AddChangeKey {...props} type="addKey" />}
                    />
                    <ProtectedRoute
                        path="/change-key"
                        component={(props) => <AddChangeKey {...props} type="changeKey" />}
                    />
                    {/*<ProtectedRoute path="/add-key" component={AddKey} type="addKey"/>*/}
                    {/*<ProtectedRoute path="/change-key" component={ChangeKey} type="changeKey"/>*/}
                    <ProtectedRoute path="/link-create" component={LinkCreate}/>
                    <Route component={FourOhFour}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {...state};
};

const mapDispatchToProps = dispatch => ({
    overrideState(state) {
        if (state.branchKey) {
            dispatch(addBranchKey(state.branchKey));
        }
        if (state.isLoggedIn) {
            dispatch(login());
        }
        dispatch(setLinkObject(state.linkObj));
    }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
