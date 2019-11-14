/*global chrome*/

export const loadState = () => {
	return new Promise((resolve, reject) => {
		try {
			// chrome.storage.sync.get(["branchLinkState"], function(result) {
			// 	if (result.branchLinkState === null) {
			// 		reject();
			// 	}
			// 	resolve(JSON.parse(result.branchLinkState));
			// });
			const storedState = localStorage.getItem("branch-link-state");
			if (storedState === null) {
				reject("err");
			}
			resolve(JSON.parse(storedState));
		} catch (err) {
			reject("err");
		}
	});
};

export const storeState = state => {
	try {
		const serializeState = JSON.stringify(state);
		// chrome.storage.sync.set({ branchLinkState: serializeState });
		localStorage.setItem("branch-link-state", serializeState);
	} catch (err) {
		// Store failed
	}
};
