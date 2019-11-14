import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers/reducers.js";
import { storeState } from "./storage";

const store = createStore(
	reducer,
	undefined,
	compose(
		applyMiddleware(thunk),
		typeof window === "object" &&
			typeof window.devToolsExtension !== "undefined"
			? window.devToolsExtension()
			: f => f
	)
);

store.subscribe(() => {
	storeState(store.getState());
});

export default store;
