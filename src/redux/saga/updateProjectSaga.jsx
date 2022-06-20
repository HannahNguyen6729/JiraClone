import { takeLatest, put, call } from "redux-saga/effects";
import Axios from "axios";
import {
  ACCESS_TOKEN,
  STATUS_CODE,
} from "../../util/constants/SystemConstants";
import * as JiraProjectService from "../../services/JiraProjectService";
import { GET_ALL_PROJECT_LIST_SAGA } from "../constants/JiraProjectAction";

function* updateProjectSaga(action) {
  try {
    let { data } = yield call(() =>
      JiraProjectService.updateProjectAPI(action.payload)
    );
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      console.log(data);
      yield put({ type: GET_ALL_PROJECT_LIST_SAGA });
    }
    yield put({type: 'CLOSE_DRAWER'})
  } catch (err) {
    console.error(err);
  }
}
export function* followUpdateProjectSaga() {
  yield takeLatest("UPDATE_PROJECT_SAGA", updateProjectSaga);
}
