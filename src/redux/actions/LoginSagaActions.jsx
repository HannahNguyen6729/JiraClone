import { LOG_IN_SAGA } from "../constants/ActionType";

export const logInAction = (email, password)=> ({
    type: LOG_IN_SAGA,
    payload: {email, password}
})