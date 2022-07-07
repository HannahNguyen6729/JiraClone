import {takeLatest, call, put} from 'redux-saga/effects'
import { DELETE_USER_SAGA, GET_ALL_USER_SAGA } from '../constants/JiraProjectAction'
import * as JiraProjectService from '../../services/JiraProjectService';
import { STATUS_CODE } from '../../util/constants/SystemConstants';
import { openNotificationWithIcon } from '../../util/notification/notification';

function *deleteUserSaga(action) {
    try{
        const {data} = yield call(()=> JiraProjectService.deleteUserAPI(action.payload))
        if(data.statusCode === STATUS_CODE.SUCCESS){
            //render UI
            yield put({type: GET_ALL_USER_SAGA})
            //show success notification
            openNotificationWithIcon('success', 'Delete successfully!')
        }
    }catch(err){
        console.log(err)
        openNotificationWithIcon('error', 'Delete failed')
    }
}
export function *followDeleteUserSaga(){
    yield takeLatest(DELETE_USER_SAGA, deleteUserSaga)
}