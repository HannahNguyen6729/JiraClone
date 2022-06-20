const defaultState = {
  visible: false,
  DrawerContentComponent: <p>hihi</p>,
  callbackSubmit: () => alert("hello"),
};
export const JiraDrawerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "OPEN_DRAWER": {
      return {
        ...state,
        visible: true,
        DrawerContentComponent: action.content,
      };
    }
    case "CLOSE_DRAWER": {
      return { ...state, visible: false };
    }
    case 'SUBMIT_EDITED_PROJECT':{
        return {...state, callbackSubmit: action.payload}
    }
    default:
      return { ...state };
  }
};
