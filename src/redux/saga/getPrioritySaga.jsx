import {takeLatest, call, put} from 'redux-saga/effects';
import { GET_PRIORITY, GET_PRIORITY_SAGA } from '../constants/JiraProjectAction';
import * as JiraProjectService from '../../services/JiraProjectService';
import { STATUS_CODE } from '../../util/constants/SystemConstants';

function *getPrioritySaga(action){
    try{
        let {data} = yield call(()=> JiraProjectService.getPriorityAPI());
        if(data.statusCode === STATUS_CODE.SUCCESS){
           yield put({type: GET_PRIORITY, payload: data.content})
        }
    }catch(err){
        console.log(err);
    }
}
export function *followGetPrioritySaga(){
    yield takeLatest(GET_PRIORITY_SAGA, getPrioritySaga)
}
