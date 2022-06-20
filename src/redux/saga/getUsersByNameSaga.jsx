import {takeLatest,put, call} from 'redux-saga/effects';
import {  STATUS_CODE } from '../../util/constants/SystemConstants';
import * as JiraProjectService from '../../services/JiraProjectService';

function *getUsersByNameSaga(action){
    try{
        const {data} = yield call(()=> JiraProjectService.getUsersByNameAPI(action.payload))
        if(data.statusCode === STATUS_CODE.SUCCESS){
            yield put({type: 'GET_USERS_BY_NAME', payload: data.content})
           // console.log(data)
        }
    }catch(err){
        console.log(err);
    }
}

export function *followGetUsersByNameSaga(){
    yield takeLatest('GET_USERS_BY_NAME_SAGA', getUsersByNameSaga)
}