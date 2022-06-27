import { GET_ALL_STATUS_ID, GET_ALL_USER, GET_MEMBERS_BY_PROJECT_ID, GET_PRIORITY, GET_TASK_TYPE } from "../constants/JiraProjectAction";

const defaultState = {
    editedProject: {
        'id':0,
        'projectName': 'default',
        'creator': 'default',
        'description':'default',
        'categoryId':3
    },
    taskTypeList:[],
    priorityList:[],
    userList:[],
    statusIdList:[],
    membersList:[]
}
export  const JiraDrawerContentReducer = (state = defaultState, action)=>{
    switch(action.type){
        case 'SHOW_EDITED_PROJECT':{
            state.editedProject = action.payload;
            return {...state}
        }
        case GET_TASK_TYPE:{
            return {...state, taskTypeList:action.payload}
        }
        case GET_PRIORITY: {
            return {...state, priorityList:action.payload}
        }
        case GET_ALL_USER: {
            return {...state,userList: action.payload}
        }
        case GET_ALL_STATUS_ID:{
            return {...state,statusIdList: action.payload}
        }
        case GET_MEMBERS_BY_PROJECT_ID:{
            return {...state,membersList: action.payload}
        }
        default: {
            return {...state}
        }
    }
}