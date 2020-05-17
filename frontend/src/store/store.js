import rootReducer from "../reducers/rootReducer";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

let initialState = {
    viewport: {
        latitude: 37.774929,
        longitude: -122.419418,
        zoom: 0.5,
        bearing: 0,
        pitch: 0
    },
    popupInfo: null,
    countySearchTerm: "initial County",
    stateSearchTerm: "initial State",
    containsComma: false,
    currSearchValue: "",
    suggestions: [],
    justSearched: false
};

let store = createStore(persistedReducer, initialState, composeWithDevTools());
let persistor = persistStore(store);
export { store, persistor };
