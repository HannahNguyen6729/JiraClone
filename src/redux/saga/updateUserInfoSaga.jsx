import {takeLatest, call, put} from 'redux-saga/effects'
import { GET_ALL_USER_SAGA, UPDATE_USER_INFO_SAGA } from '../constants/JiraProjectAction'
import * as JiraProjectService from '../../services/JiraProjectService'
import { STATUS_CODE } from '../../util/constants/SystemConstants'
import { openNotificationWithIcon } from '../../util/notification/notification';

function *updateUserInfoSaga(action){
    try{
        const {data}= yield call(()=> JiraProjectService.updateUserInfoAPI(action.payload))
        if(data.statusCode === STATUS_CODE.SUCCESS){
            //show success notification
            openNotificationWithIcon('success', 'Update successfully!')
            yield put({type: 'CLOSE_DRAWER'})
            yield put({type: GET_ALL_USER_SAGA})
        }
    }catch(err){
        console.log(err)
        openNotificationWithIcon('error', 'Update failed')
    }
}
export function *followUpdateUserInfoSaga(){
    yield takeLatest(UPDATE_USER_INFO_SAGA, updateUserInfoSaga)
}