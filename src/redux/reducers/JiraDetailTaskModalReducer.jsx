import { ADD_MEMBER_TO_TASK, CHANGE_DETAIL_TASK_MODAL, DELETE_MEMBER_IN_TASK, GET_DETAIL_TASK } from "../constants/JiraProjectAction";

const defaultState = {
  priorityTask: {
    priorityId: 1,
    priority: "default",
  },
  taskTypeDetail: {
    id: 1,
    taskType: "default",
  },
  assigness: [
    {
      id: 1,
      avatar: "https://ui-avatars.com/api/?name=thanh",
      name: "default",
      alias: "default",
    },
  ],
  lstComment: [{
    id:0,
    idUser: 0,
    taskId:0,
    name: "default",
    commentContent: "default default",
    avatar:'https://ui-avatars.com/api/?name=Khoasharp'
  }],
  taskId: 1,
  taskName: "default name",
  alias: "default name",
  description: "<p>hello</p>",
  statusId: "1",
  originalEstimate: 1,
  timeTrackingSpent: 1,
  timeTrackingRemaining: 1,
  typeId: 1,
  priorityId: 1,
  projectId: 1,
};
export const JiraDetailTaskModalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_DETAIL_TASK: {
        state = action.payload;
        return { ...state };
    }
    case CHANGE_DETAIL_TASK_MODAL:{
      state = {...state, [action.payload.name]: action.payload.value}; 
      console.log('redux',state)
      return { ...state };
    }
    case ADD_MEMBER_TO_TASK:{
      state.assigness= [...state.assigness, action.payload];
      return { ...state };
    }
    case DELETE_MEMBER_IN_TASK:{
      state.assigness= [...state.assigness.filter(item=> item.id !== action.payload)];
      return { ...state}
    }
    default:
        return { ...state };
  }
};
