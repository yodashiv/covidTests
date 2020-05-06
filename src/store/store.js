import rootReducer from "../reducers/rootReducer";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

let initialState = {
    viewport: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 3.5,
        bearing: 0,
        pitch: 0
    },
    popupInfo: null,
    searchTerm: "initial"
};

export const store = createStore(rootReducer, initialState, composeWithDevTools());
