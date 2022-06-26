import Axios from 'axios';
import {put, call, takeLatest} from 'redux-saga/effects';
import { ACCESS_TOKEN, STATUS_CODE } from '../../util/constants/SystemConstants';
import * as JiraProjectService from '../../services/JiraProjectService';
function *getProjectDetailSaga(action){
    try{
        let {data}= yield call(()=> JiraProjectService.getProjectDetailAPI(action.payload))
        
        if(data.statusCode === STATUS_CODE.SUCCESS){
            console.log(data.content)
            yield put({type: 'GET_PROJECT_DETAIL', payload: data.content})
        }
    }catch(err){
        console.log(err);
    }
}
export function *followGetProjectDetailSaga(){
    yield takeLatest( 'GET_PROJECT_DETAIL_SAGA', getProjectDetailSaga);
}
