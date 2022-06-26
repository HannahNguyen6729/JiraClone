import {takeLatest, call, put} from 'redux-saga/effects';
import { CREATE_TASK_SAGA } from '../constants/JiraProjectAction';
import * as JiraProjectService from '../../services/JiraProjectService';
import { STATUS_CODE } from '../../util/constants/SystemConstants';
import * as notification from '../../util/notification/notification';

function *createTaskSaga(action) {
    try{
        const {data} = yield call(()=>JiraProjectService.createTaskAPI(action.payload) )
        if(data.statusCode === STATUS_CODE.SUCCESS){
            notification.openNotificationWithIcon('success', 'Create a new task successfully')
            yield put({type: 'CLOSE_DRAWER'})
        }
    }catch(err){
        console.error(err);
        notification.openNotificationWithIcon('error', 'Create failed')
    }
}
export function *followCreateTaskSaga(){
    yield takeLatest(CREATE_TASK_SAGA, createTaskSaga )
}