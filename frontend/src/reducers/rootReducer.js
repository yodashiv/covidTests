function setNewPopup (state, action) {
    return {
        ...state,
        popupInfo: action.popupInfo
    };
}

function setNewViewport (state, action) {
    return {
        ...state,
        viewport: action.viewport
    };
}

function setSuggestions(state, action) {
    return {
        ...state,
        suggestions: action.suggestions
    };
}

function setCurrSearchValue(state, action) {
    return {
        ...state,
        currSearchValue: action.currSearchValue
    };
}

function setNewSearchTerm(state, action) {
    return {
        ...state,
        countySearchTerm: action.countySearchTerm,
        stateSearchTerm: action.stateSearchTerm,
        containsComma: action.containsComma,
        justSearched: true
    };
}

function setJustSearchedFalseAndNewViewPort(state, action) {
    return {
        ...state,
        justSearched: false,
        viewport: {
            ...state.viewport,
            latitude: action.latitude,
            longitude: action.longitude,
            zoom: 10
        }
    };
}

export default function rootReducer(state, action) {
    switch(action.type) {
        case "setCurrSearchValue":
            return setCurrSearchValue(state, action);
        case "setSuggestions":
            return setSuggestions(state, action);
        case "setNewPopup":
            return setNewPopup(state, action);
        case "setNewViewport":
            return setNewViewport(state, action);
        case "setNewSearchTerm":
            return setNewSearchTerm(state, action);
        case "setJustSearchedFalseAndNewViewPort":
            return setJustSearchedFalseAndNewViewPort(state, action);
        default:
            return state;
    }
}
