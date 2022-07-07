import {takeLatest, call, put} from 'redux-saga/effects'
import * as JiraProjectService from '../../services/JiraProjectService';
import { STATUS_CODE } from '../../util/constants/SystemConstants';
import { history } from '../../util/library/history';
import { openNotificationWithIcon } from '../../util/notification/notification';

function *signUpSaga(action) {
    try{
        const {data} = yield call(()=> JiraProjectService.signUpAPI(action.payload))
        //console.log(data.content)
        if(data.statusCode === STATUS_CODE.SUCCESS){
            history.push('./login')
             //show success notification
             openNotificationWithIcon('success', 'Signup successfully!')
             yield put({type: 'CLOSE_DRAWER'})
            }
    }catch(err){
        console.log(err)
        openNotificationWithIcon('error', 'Signup failed')
    }
}

export function *followSignUpSaga(){
    yield takeLatest('SIGN_UP_SAGA', signUpSaga)
}