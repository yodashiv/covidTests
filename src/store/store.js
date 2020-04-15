import rootReducer from "../reducers/rootReducer";
import { createStore } from "redux";

let initialState = {
    viewport: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 3.5,
        bearing: 0,
        pitch: 0
    },
    popupInfo: null
};

export const store = createStore(rootReducer, initialState);
