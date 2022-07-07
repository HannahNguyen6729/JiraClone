import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

import ContentMain from '../../components/JiraComp/ContentMain'
import HeaderMain from '../../components/JiraComp/HeaderMain'
import InfoMain from '../../components/JiraComp/InfoMain'

export default function JiraBoard(props) {
  let projectDetail = useSelector((state) => state.JiraManagementReducer.projectDetail);
  const dispatch = useDispatch();
 
  useEffect(()=>{
    const projectId = props.match.params.projectId;
    dispatch({
        type: 'GET_PROJECT_DETAIL_SAGA',
        payload: projectId
    })
},[])
  return (
     <div className="container " style={{maxHeight: '100vh', overflowY: 'scroll'}}>
       <div className = 'main mt-5'>
        <HeaderMain/>
        <h3 className='mt-3'>{projectDetail.projectName}</h3>
        <span className = 'font-weight-bold'>Description:</span> 
        <>{ReactHtmlParser(projectDetail.description)}</>
        <InfoMain  projectDetail= {projectDetail}/>
        <ContentMain  projectDetail= {projectDetail}/>
      </div>
     </div>
  )
}
