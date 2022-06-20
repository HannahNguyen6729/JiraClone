import { takeLatest, put, call } from "redux-saga/effects";
import { STATUS_CODE } from "../../util/constants/SystemConstants";
import * as JiraProjectService from "../../services/JiraProjectService";
import { GET_ALL_PROJECT_LIST, GET_ALL_PROJECT_LIST_SAGA } from "../constants/JiraProjectAction";

//get all project list from API
function* getAllProjectListSaga(action) {
  try {
    let { data } = yield call(() => JiraProjectService.getAllProjectListAPI());
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      yield put({type: GET_ALL_PROJECT_LIST, payload: data.content})
    }
  } catch (err) {
    console.log(err);
  }
}

export function* followGetAllProjectListSaga() {
  yield takeLatest(GET_ALL_PROJECT_LIST_SAGA, getAllProjectListSaga);
}
