import React from 'react'
import ContentMain from '../../components/JiraComp/ContentMain'
import HeaderMain from '../../components/JiraComp/HeaderMain'
import InfoMain from '../../components/JiraComp/InfoMain'

export default function Jira() {
  return (
     <div className="container">
       <div className = 'main mt-5'>
        <HeaderMain/>
        <h3>Kanban Board</h3>
        <InfoMain/>
        <ContentMain/>
      </div>
     </div>
  )
}
