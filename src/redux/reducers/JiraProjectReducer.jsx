import { GET_ALL_PROJECT_CATEGORIES } from "../constants/JiraProjectAction";

const defaultState = {
  projectList: [],
};

export const JiraProjectReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT_CATEGORIES:{
      state.projectList = action.payload;
      return {...state}
    }
    default:
      return { ...state };
  }
};
