import {takeLatest, call, put} from 'redux-saga/effects';
import { STATUS_CODE } from '../../util/constants/SystemConstants';
import { GET_ALL_STATUS_ID, GET_ALL_STATUS_ID_SAGA } from '../constants/JiraProjectAction';
import * as JiraProjectService from '../../services/JiraProjectService';

function *getAllStatusIdSaga(action){
    try{
        const {data} = yield call(()=> JiraProjectService.getAllStatusIdAPI())
        if(data.statusCode === STATUS_CODE.SUCCESS){
            yield put({type: GET_ALL_STATUS_ID, payload: data.content})
        }
    }catch(err){
        console.log(err);   
    }
}
export function *followGetAllStatusIdSaga(){
    yield takeLatest(GET_ALL_STATUS_ID_SAGA, getAllStatusIdSaga)
}