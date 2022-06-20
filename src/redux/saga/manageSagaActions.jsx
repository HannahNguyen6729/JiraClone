import Axios from "axios";
import { call, takeLatest, select, put } from "redux-saga/effects";
import { logInService } from "../../services/LogInService";
import {
  ACCESS_TOKEN,
  STATUS_CODE,
  USER_INFO,
} from "../../util/constants/SystemConstants";
import { history } from "../../util/library/history";
import { LOG_IN_SAGA, UPDATE_USER_INFO } from "../constants/ActionType";

export function* signInSaga(action) {
    let {email, password} = action.payload;
  try {
    const { data, status } = yield call(()=> logInService(email, password));
    if (status === STATUS_CODE.SUCCESS) {
      localStorage.setItem(USER_INFO, JSON.stringify(data.content));
      localStorage.setItem(ACCESS_TOKEN, data.content.accessToken);
      yield put({type: UPDATE_USER_INFO , payload: data.content})
    }
    history.push('/home');
  } catch (err) {
    console.log(err);
  }
}

export function* followSignInSaga() {
  yield takeLatest(LOG_IN_SAGA, signInSaga);
}
