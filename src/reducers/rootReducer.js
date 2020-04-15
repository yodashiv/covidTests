function setActivePopUp (state, action) {
    return {
        ...state,
        popupInfo: action.newactivePopup
    }
}

function setNewViewport (state, action) {
    return {
        ...state,
        viewport: action.newviewport
    }
}

export default function rootReducer(state, action) {
    switch(action.type) {
        case "setActivePopUp":
            return setActivePopUp(state, action);
        case "setNewViewport":
            return setNewViewport(state, action);
    }
}
