import { SET_SUBMIT_CREATE_TASK } from "../constants/JiraProjectAction";

const defaultState = {
  visible: false,
  title: 'string',
  DrawerContentComponent: <p>hihi</p>,
  callbackSubmit: () => alert("hello"),
};
export const JiraDrawerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'OPEN_DRAWER':{
      return {
        ...state,
        visible: true,
        title: action.title,
        DrawerContentComponent: action.content,
      }
    }
    case "CLOSE_DRAWER": {
      return { ...state, visible: false };
    }
    case 'SUBMIT_EDITED_PROJECT':{
        return {...state, callbackSubmit: action.payload}
    }
    case 'SUBMIT_EDITED_USER_INFO':{
      return {...state, callbackSubmit: action.payload}
    }
    case 'SUBMIT_CREATED_USER_INFO':{
      return {...state, callbackSubmit: action.payload}
    }
    case SET_SUBMIT_CREATE_TASK: {
      return {...state, callbackSubmit: action.payload}
    }
    default:
      return { ...state };
  }
};
