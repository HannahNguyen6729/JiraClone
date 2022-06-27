import {call, put, takeLatest} from 'redux-saga/effects';
import { GET_MEMBERS_BY_PROJECT_ID, GET_MEMBERS_BY_PROJECT_ID_SAGA } from '../constants/JiraProjectAction';
import * as JiraProjectService from '../../services/JiraProjectService';
import { STATUS_CODE } from '../../util/constants/SystemConstants';

function *getMembersByProjectIdSaga(action){
    try{
        let {data} = yield call(()=> JiraProjectService.getMembersByProjectIdAPI(action.payload));
        if(data.statusCode === STATUS_CODE.SUCCESS){
            yield put({type: GET_MEMBERS_BY_PROJECT_ID, payload: data.content})
        }
    }catch(error){
        if(error.response?.data.statusCode === STATUS_CODE.NOT_FOUND){
            yield put({type: GET_MEMBERS_BY_PROJECT_ID, payload: []})
        }
        console.log(error);
    }
}
export function *followGetMembersByProjectIdSaga(){
    yield takeLatest(GET_MEMBERS_BY_PROJECT_ID_SAGA, getMembersByProjectIdSaga)
}