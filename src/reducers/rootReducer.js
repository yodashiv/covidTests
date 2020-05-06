function setNewPopup (state, action) {
    return {
        ...state,
        popupInfo: action.popupInfo
    }
}

function setNewViewport (state, action) {
    return {
        ...state,
        viewport: action.viewport
    }
}

function setNewSearchTerm(state, action) {
    return {
        ...state,
        searchTerm: action.searchTerm
    }
}

export default function rootReducer(state, action) {
    switch(action.type) {
        case "setNewPopup":
            return setNewPopup(state, action);
        case "setNewViewport":
            return setNewViewport(state, action);
        case "setNewSearchTerm":
            return setNewSearchTerm(state, action);
        default:
            return state;
    }
}
