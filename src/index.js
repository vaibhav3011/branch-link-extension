import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import App from "./App";

ReactDOM.render(
	<BrowserRouter>
		<Provider store={configureStore}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById("root")
);
