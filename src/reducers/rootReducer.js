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

export default function rootReducer(state, action) {
    switch(action.type) {
        case "setNewPopup":
            return setNewPopup(state, action);
        case "setNewViewport":
            return setNewViewport(state, action);
        default:
            return state;
    }
}
