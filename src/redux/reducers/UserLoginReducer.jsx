import { UPDATE_USER_INFO } from "../constants/ActionType";
//store user data in redux store so when refresh F5, user data is stored
let userInfo = {};
let currentUser =JSON.parse(localStorage.getItem('USER_INFO')) 
if(currentUser){
    userInfo = currentUser;
}

export const UserLoginReducer = (state = userInfo, action) =>{
    switch(action.type){
        //when user login with different account
        case UPDATE_USER_INFO:
            state = action.payload;
            return {...state}
        default:
            return {...state}
    }
}