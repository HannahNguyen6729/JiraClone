import { CHANGE_DETAIL_TASK_MODAL, GET_DETAIL_TASK } from "../constants/JiraProjectAction";

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
  lstComment: [],
  taskId: 1,
  taskName: "default name",
  alias: "default name",
  description: "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, corrupti! Quidem corporis consequuntur nostrum cumque. Doloremque totam ut neque fugiat reiciendis sint at doloribus optio minima culpa, iure nesciunt vero!</p>",
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
      //console.log(state)
      return { ...state };
    }
    default:
        return { ...state };
  }
};
