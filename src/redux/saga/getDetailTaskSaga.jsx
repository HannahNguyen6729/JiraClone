import {takeLatest, call, put} from 'redux-saga/effects';
import { GET_DETAIL_TASK, GET_DETAIL_TASK_SAGA } from '../constants/JiraProjectAction';
import * as JiraProjectService from '../../services/JiraProjectService';
import { STATUS_CODE } from '../../util/constants/SystemConstants';

function *getDetailTaskSaga(action){
    try{
        let {data} = yield call(()=> JiraProjectService.getDetailTaskAPI(action.payload));
        if(data.statusCode === STATUS_CODE.SUCCESS){
            yield put({type: GET_DETAIL_TASK, payload: data.content})
        }
    }catch(err){
        console.log(err);
    }
}
export function *followGetDetailTaskSaga(){
    yield takeLatest(GET_DETAIL_TASK_SAGA, getDetailTaskSaga)
}
