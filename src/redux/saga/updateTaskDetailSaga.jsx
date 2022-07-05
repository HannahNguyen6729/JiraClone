import {takeLatest, call, put, select} from 'redux-saga/effects';
import { ADD_COMMENT_TO_TASK_SAGA, ADD_MEMBER_TO_TASK, CHANGE_DETAIL_TASK_MODAL, DELETE_COMMENT_SAGA, DELETE_MEMBER_IN_TASK, GET_DETAIL_TASK_SAGA, UPDATE_COMMENT_SAGA, UPDATE_TASK_DETAIL_SAGA } from '../constants/JiraProjectAction';
import * as JiraProjectService from '../../services/JiraProjectService';
import { STATUS_CODE } from '../../util/constants/SystemConstants';
function * updateTaskDetailSaga(action) {
    //call action which changes taskDetailModal
    switch(action.actionType){
        case CHANGE_DETAIL_TASK_MODAL :{
            const {name, value} = action.payload;
            yield put({type: CHANGE_DETAIL_TASK_MODAL, payload:{name,value} })
            break;
        }
        case ADD_MEMBER_TO_TASK:{
            const selectedMember = action.payload;
            yield put({type: ADD_MEMBER_TO_TASK, payload: selectedMember })
            break;
        }
        case DELETE_MEMBER_IN_TASK:{
            const memberId = action.payload;
            yield put({
                type: DELETE_MEMBER_IN_TASK, payload: memberId
            })
            break;
        }
        case ADD_COMMENT_TO_TASK_SAGA:{
            //console.log(action.payload)
            try{
                const {data}= yield call(()=> JiraProjectService.addCommentToTaskAPI(action.payload))
            }catch(err){
                console.log(err)
            }
            break;
        }
        case UPDATE_COMMENT_SAGA:{
            //console.log(action.payload)
            try{
                const {data} = yield call(()=> JiraProjectService.updateCommentAPI(action.payload.id, action.payload.contentComment))
            }catch(err){
                console.log(err)
            }
            break;
        }
        case DELETE_COMMENT_SAGA:{
            //console.log(action.payload)
            try{
                const {data}= yield call(()=> JiraProjectService.deleteCommentAPI(action.payload))
            }catch(err){
                console.log(err)
            }
            break;
        }
        default: 
        return;
    }
    //get updatedTaskDetailModal from reducer
    let updatedTaskDetailModal= yield select(state=> state.JiraDetailTaskModalReducer)
    let memberAssignList = updatedTaskDetailModal.assigness.map((mem)=> mem.id )
    updatedTaskDetailModal = {...updatedTaskDetailModal, listUserAsign:memberAssignList }
    
    //call API to update the task detail and project detail
    try{
        const {data} = yield call(()=> JiraProjectService.updateTaskDetailAPI(updatedTaskDetailModal))
        if(data.statusCode === STATUS_CODE.SUCCESS){
            yield put({
                type:'GET_PROJECT_DETAIL_SAGA',
                payload: updatedTaskDetailModal.projectId
            })
            yield put({
                type: GET_DETAIL_TASK_SAGA,
                payload: updatedTaskDetailModal.taskId
            })
        }
    }catch(err){
        console.log(err)
    }
}
export function *followUpdateTaskDetailSaga(){
    yield takeLatest(UPDATE_TASK_DETAIL_SAGA, updateTaskDetailSaga)
}
