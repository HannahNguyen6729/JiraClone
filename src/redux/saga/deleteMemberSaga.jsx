
import {takeLatest, call, put} from 'redux-saga/effects';

import {  STATUS_CODE } from '../../util/constants/SystemConstants';
import { GET_ALL_PROJECT_LIST_SAGA } from '../constants/JiraProjectAction';
import * as JiraProjectService from '../../services/JiraProjectService';
function *deleteMemberSaga(action){
    try{
        let {data} = yield call(()=> JiraProjectService.deleteMemberAPI(action.payload) )
         if(data.statusCode === STATUS_CODE.SUCCESS){
            console.log(data)
         }
         yield put({type: GET_ALL_PROJECT_LIST_SAGA})
    }catch(err){
        console.log(err);
    }
}
export function *followDeleteMemberSaga(){
    yield takeLatest('DELETE_MEMBER_SAGA', deleteMemberSaga)
}