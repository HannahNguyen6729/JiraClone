import { takeLatest, call, put } from "redux-saga/effects";
import * as JiraProjectService from "../../services/JiraProjectService";
import { STATUS_CODE } from "../../util/constants/SystemConstants";
import { GET_ALL_PROJECT_CATEGORIES, GET_ALL_PROJECT_CATEGORIES_SAGA } from "../constants/JiraProjectAction";

//get all project categories API
function* getAllProjectCategoriesSaga(action) {
  try {
    let { data } = yield call(JiraProjectService.getProjectCategoriesAPI);
    if (data.statusCode === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_ALL_PROJECT_CATEGORIES, payload: data.content });
    }
  } catch (err) {
    console.log(err);
  }
}
export function* followGetAllProjectCategoriesSaga() {
  yield takeLatest( GET_ALL_PROJECT_CATEGORIES_SAGA, getAllProjectCategoriesSaga );
}


