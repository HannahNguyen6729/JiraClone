import Axios from 'axios';
import { ACCESS_TOKEN } from '../util/constants/SystemConstants';

export const getProjectCategoriesAPI = ()=>{
    return Axios({
        method: 'GET',
        url: 'http://casestudy.cyberlearn.vn/api/ProjectCategory'
    })
}
export const createProjectAPI =(newProject)=>{
    return Axios({
        method: 'POST',
        url:'http://casestudy.cyberlearn.vn/api/Project/createProject',
        data: newProject
    })
}
export const createProjectAuthorizationAPI = (newProject) => {
    return Axios({
        method: 'POST',
        url:'http://casestudy.cyberlearn.vn/api/Project/createProjectAuthorize',
        data: newProject,
        headers: {'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
    })
}
//create an account with: mail: anna@gmail.com
//password: 123456
//access token: eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhbm5hQGdtYWlsLmNvbSIsIm5iZiI6MTY1NTM1ODIxNywiZXhwIjoxNjU1MzYxODE3fQ.mAkxFxahlaidAA-AnOIxKoWdpaw-aU2Lqs-kJNOiG5E
//authorization: bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhbm5hQGdtYWlsLmNvbSIsIm5iZiI6MTY1NTM1ODIxNywiZXhwIjoxNjU1MzYxODE3fQ.mAkxFxahlaidAA-AnOIxKoWdpaw-aU2Lqs-kJNOiG5E

export const getAllProjectListAPI = ()=>{
    return Axios({
        method: 'GET',
        url: 'http://casestudy.cyberlearn.vn/api/Project/getAllProject',
        headers: {'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
    })
}

export const updateProjectAPI = (project)=>{
    return Axios({
        method: 'PUT',
        url:`http://casestudy.cyberlearn.vn/api/Project/updateProject?projectId=${project.id}`,
        data: project,
        headers: {'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
    })
}

export const deleteProjectAPI= (id) => {
    return Axios({
        method: 'DELETE',
        url:`http://casestudy.cyberlearn.vn/api/Project/deleteProject?projectId=${id}`,
        headers: {'Authorization': 'Bearer '+ localStorage.getItem(ACCESS_TOKEN)},
    })
}

export const getUsersByNameAPI =(name)=>{
    return Axios({
        method: 'GET',
        url: `http://casestudy.cyberlearn.vn/api/Users/getUser?keyword=${name}`,
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
    })
}

export const addMoreMembersAPI = (payload)=>{
    return Axios({
        method: 'POST',
        url: `http://casestudy.cyberlearn.vn/api/Project/assignUserProject`,
        data: payload,
        headers: { 'Authorization' : 'Bearer '+ localStorage.getItem(ACCESS_TOKEN) }
    })
}
export const deleteMemberAPI = (payload) =>{
    return Axios({
        method: 'POST',
        url:`http://casestudy.cyberlearn.vn/api/Project/removeUserFromProject`,
        data:payload,
        headers: {'Authorization': 'Bearer '+ localStorage.getItem(ACCESS_TOKEN)},
    })
}
export const getProjectDetailAPI = (projectId)=>{
    return Axios({
        method: 'GET',
        url: `http://casestudy.cyberlearn.vn/api/Project/getProjectDetail?id=${projectId}`,
        headers: {'Authorization': 'Bearer '+ localStorage.getItem(ACCESS_TOKEN)}
    })
}
export const getTaskTypeAPI = ()=>{
    return Axios({
        method: 'GET',
        url: 'http://casestudy.cyberlearn.vn/api/TaskType/getAll'
    })
}
export const getPriorityAPI = ()=>{
    return Axios({
        method: 'GET',
        url: 'http://casestudy.cyberlearn.vn/api/Priority/getAll?id=0'
    })
}
export const getAllUserAPI =()=>{
    return Axios({
        method: 'GET',
        url: 'http://casestudy.cyberlearn.vn/api/Users/getUser', 
        headers: {'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
    })
}
export const createTaskAPI = (payload)=>{
    return Axios({
        method: 'POST',
        url:'http://casestudy.cyberlearn.vn/api/Project/createTask',
        data: payload,
        headers: {'Authorization': 'Bearer '+ localStorage.getItem(ACCESS_TOKEN)},
    })
}
export const getAllStatusIdAPI=() => {
    return Axios({
        method:'GET',
        url:'http://casestudy.cyberlearn.vn/api/Status/getAll'
    })
}
export const getMembersByProjectIdAPI = (projectId)=>{
    return Axios({
        method: 'GET',
        url: `http://casestudy.cyberlearn.vn/api/Users/getUserByProjectId?idProject=${projectId}`,
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
    })
}
export const getDetailTaskAPI = (taskId)=>{
    return Axios({
        method:'GET',
        url:`http://casestudy.cyberlearn.vn/api/Project/getTaskDetail?taskId=${taskId}`,
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
    })
}
export const updateTaskDetailAPI =(updateTask)=>{
    return Axios({
        method:'POST',
        url: 'http://casestudy.cyberlearn.vn/api/Project/updateTask',
        data: updateTask,
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
    })
}
export const addCommentToTaskAPI = (payload)=> {
    return Axios({
        method: 'POST',
        url:`http://casestudy.cyberlearn.vn/api/Comment/insertComment`,
        data: payload,
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
    })
}
export const updateCommentAPI = (id,commentContent) => {
    return Axios({
        method: 'PUT',
        url:`http://casestudy.cyberlearn.vn/api/Comment/updateComment?id=${id}&contentComment=${commentContent}`,
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
    })
}
export const deleteCommentAPI = (id) => {
    return Axios({
        method: 'DELETE',
        url:`http://casestudy.cyberlearn.vn/api/Comment/deleteComment?idComment=${id}`,
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
    })
}