import {takeLatest, call, put} from 'redux-saga/effects';
import { GET_TASK_TYPE, GET_TASK_TYPE_SAGA } from "../constants/JiraProjectAction";
import * as JiraProjectService from "../../services/JiraProjectService";
import { STATUS_CODE } from '../../util/constants/SystemConstants';

function *getTaskTypeSaga(action){
    try{
        const {data} = yield call(()=> JiraProjectService.getTaskTypeAPI());
        if(data.statusCode === STATUS_CODE.SUCCESS){
            yield put({type: GET_TASK_TYPE, payload: data.content})
        }    
    }catch(err){
        console.log(err)
    }
    
}
export function *followGetTaskTypeSaga(){
    yield takeLatest(GET_TASK_TYPE_SAGA, getTaskTypeSaga)
}