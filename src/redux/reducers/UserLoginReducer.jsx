import { UPDATE_USER_INFO } from "../constants/ActionType";

let userInfo = {};
let currentUser =JSON.parse(localStorage.getItem('USER_INFO')) 
if(currentUser){
    userInfo = currentUser;
}

export const UserLoginReducer = (state = userInfo, action) =>{
    switch(action.type){
        case UPDATE_USER_INFO:
            state = action.payload;
            return {...state}
        default:
            return {...state}
    }
}