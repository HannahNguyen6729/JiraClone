
import {put, call, takeLatest} from 'redux-saga/effects';
import { GET_ALL_USER, GET_ALL_USER_SAGA } from '../constants/JiraProjectAction';
import * as JiraProjectService from '../../services/JiraProjectService';
import { STATUS_CODE } from '../../util/constants/SystemConstants';

function *getAllUserSaga(action) {
    try{
        const {data} = yield call(()=> JiraProjectService.getAllUserAPI());
        if(data.statusCode === STATUS_CODE.SUCCESS){
            yield put({type: GET_ALL_USER, payload: data.content})
        }
    }catch(err){
        console.log(err);
    }
}
export function *followGetAllUserSaga(){
    yield takeLatest(GET_ALL_USER_SAGA, getAllUserSaga)
}