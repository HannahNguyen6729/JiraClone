import {takeLatest,call, put} from 'redux-saga/effects';
import { CREATE_PROJECT_SAGA } from "../constants/JiraProjectAction";
import * as JiraProjectService from '../../services/JiraProjectService';
import { STATUS_CODE } from '../../util/constants/SystemConstants';
import { history } from '../../util/library/history';


// create a new project
function * createProjectSaga(action){
    try{
        let {data} = yield call(()=> JiraProjectService.createProjectAuthorizationAPI(action.payload) )
        if(data.statusCode === STATUS_CODE.SUCCESS){
            history.push('/jiramanagement');
        }
    }catch(err){
        console.log(err)
    }
}

export function *followCreateProjectSaga(){
    yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}