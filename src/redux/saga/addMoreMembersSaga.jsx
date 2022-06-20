
import { takeLatest,put, call} from 'redux-saga/effects';
import {  STATUS_CODE } from '../../util/constants/SystemConstants';
import { GET_ALL_PROJECT_LIST_SAGA } from '../constants/JiraProjectAction';
import * as JiraProjectService from '../../services/JiraProjectService';
function *addMoreMembersSaga(action){
    try{
        let {data} = yield call(()=> JiraProjectService.addMoreMembersAPI(action.payload))
        if(data.statusCode === STATUS_CODE.SUCCESS){
            // console.log(data)
            yield put({type: GET_ALL_PROJECT_LIST_SAGA})
        }
    }catch(err){
        console.error(err);
    }
}
export function *followAddMoreMembersSaga(){
    yield takeLatest('ADD_MORE_MEMBERS_SAGA', addMoreMembersSaga)
}