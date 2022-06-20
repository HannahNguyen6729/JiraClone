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
    ]);
};