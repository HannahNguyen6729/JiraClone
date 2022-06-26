import {all } from 'redux-saga/effects';
import * as manageSagaActions from './manageSagaActions';
import * as getAllProjectCategoriesSaga from './getAllProjectCategoriesSaga';
import * as createProjectSaga from './createProjectSaga';
import * as getAllProjectListSaga from './getAllProjectListSaga';
import * as updateProjectSaga from './updateProjectSaga';
import * as deleteProjectSaga from './deleteProjectSaga';
import * as getUsersByNameSaga from './getUsersByNameSaga';
import * as addMoreMembersSaga from './addMoreMembersSaga';
import * as deleteMemberSaga from './deleteMemberSaga';
import * as getProjectDetailSaga from './getProjectDetailSaga';
import * as getTaskTypeSaga from './getTaskTypeSaga';
import * as getPrioritySaga from './getPrioritySaga';
import * as getAllUserSaga from './getAllUserSaga';
import * as createTaskSaga from './createTaskSaga';

export function *rootSaga(){
    yield all([
        manageSagaActions.followSignInSaga(),
        getAllProjectCategoriesSaga.followGetAllProjectCategoriesSaga(),
        createProjectSaga.followCreateProjectSaga(),
        getAllProjectListSaga.followGetAllProjectListSaga(),
        updateProjectSaga.followUpdateProjectSaga(),
        deleteProjectSaga.followDeleteProjectSaga(),
        getUsersByNameSaga.followGetUsersByNameSaga(),
        addMoreMembersSaga.followAddMoreMembersSaga(),
        deleteMemberSaga.followDeleteMemberSaga(),
        getProjectDetailSaga.followGetProjectDetailSaga(),
        getTaskTypeSaga.followGetTaskTypeSaga(),
        getPrioritySaga.followGetPrioritySaga(),
        getAllUserSaga.followGetAllUserSaga(),
        createTaskSaga.followCreateTaskSaga(),
    ]);
};