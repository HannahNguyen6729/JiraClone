import { GET_ALL_PROJECT_LIST } from "../constants/JiraProjectAction"

let defaultState = {
    projectArr: [],
    userList: [],
    projectDetail: {
        id:null,
        projectName:'',
        projectCategory:{},
        members: [],
        creator:{},
        description:'',
        lstTask:[]
    }
}

export const JiraManagementReducer = (state= defaultState, action) =>{
    switch(action.type){
        case GET_ALL_PROJECT_LIST:{
            state.projectArr = action.payload;
            return {...state}
        }
        case 'GET_USERS_BY_NAME':{
            state.userList = action.payload;
            return {...state}
        }
        case 'GET_PROJECT_DETAIL':{
            state.projectDetail = action.payload;
            return {...state}}
        default: 
        return {...state}
    }
}