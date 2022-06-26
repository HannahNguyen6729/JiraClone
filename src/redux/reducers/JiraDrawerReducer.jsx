const defaultState = {
  visible: false,
  title: 'string',
  DrawerContentComponent: <p>hihi</p>,
  callbackSubmit: () => alert("hello"),
};
export const JiraDrawerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "OPEN_DRAWER_EDIT_PROJECT": {
      return {
        ...state,
        visible: true,
        title: action.title,
        DrawerContentComponent: action.content,
      };
    }
    case "OPEN_DRAWER_CREATE_TASK": {
      return {
        ...state,
        visible: true,
        title: action.title,
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
