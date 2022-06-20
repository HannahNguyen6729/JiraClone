import {takeLatest, call, put} from 'redux-saga/effects';

import {  STATUS_CODE } from '../../util/constants/SystemConstants';
import { GET_ALL_PROJECT_LIST_SAGA } from '../constants/JiraProjectAction';
import * as JiraProjectService from '../../services/JiraProjectService';
import * as notification from '../../util/notification/notification';
function *deleteProjectSaga(action){
    try{
        let {data} = yield call(()=> JiraProjectService.deleteProjectAPI(action.payload) )
         if(data.statusCode === STATUS_CODE.SUCCESS){
            //console.log(data)
            notification.openNotificationWithIcon('success', 'Delete successfully')
         }
         yield put({type: GET_ALL_PROJECT_LIST_SAGA})
    }catch(err){
        console.log(err);
        notification.openNotificationWithIcon('error', 'Delete failed')
    }
}
export function *followDeleteProjectSaga(){
    yield takeLatest('DELETE_PROJECT_SAGA', deleteProjectSaga)
}