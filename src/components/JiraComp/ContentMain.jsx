import React from "react";
import {useDispatch} from 'react-redux';
import { GET_DETAIL_TASK_SAGA } from "../../redux/constants/JiraProjectAction";

export default function ContentMain(props) {
  const { projectDetail } = props;
  const dispatch = useDispatch();
  //console.log(projectDetail);


  const renderTaskList = () => {
    return projectDetail.lstTask?.map((task, index) => (
      <div key={index} className="card" style={{ width: "17rem", height: "auto" }}>
        <div className="card-header">{task.statusName}</div>
        <ul className="list-group list-group-flush">
          {task.lstTaskDeTail.map((item,i)=> (
            <li key={i} className="list-group-item" 
                data-toggle="modal"
                data-target="#infoModal"
                style={{ cursor: "pointer" }}
                onClick={()=> dispatch({type: GET_DETAIL_TASK_SAGA, payload: item.taskId})}
                > 
              <p>{item.taskName}</p>
              <div className="block" style={{ display: "flex" }}>
              <div className="block-left">
                <span className="text-danger">{item.priorityTask.priority}</span>
                <i className="fa fa-arrow-up" />
              </div>
              <div className="block-right">
                <div className="avatar-group" style={{ display: "flex" }}>
                  <div className="avatar">
                    {item.assigness.map((member,index)=> <img src={member.avatar} alt={member.name} key={index} />)}
                  </div>
                </div>
              </div>
            </div>
            </li>
          ))}  
        </ul>
      </div>
    ));
  };
  return (
    <div className="content" style={{ display: "flex" }}>
      {renderTaskList()}
    </div>
  );
}

{
  /* <div className="card" style={{ width: "17rem", height: "25rem" }}>
        <div className="card-header">BACKLOG 3</div>
        <ul className="list-group list-group-flush">
          <li
            className="list-group-item"
            data-toggle="modal"
            data-target="#infoModal"
            style={{ cursor: "pointer" }}
          >
            <p>
              Each issue has a single reporter but can have multiple assignees
            </p>
            <div className="block" style={{ display: "flex" }}>
              <div className="block-left">
                <i className="fa fa-bookmark" />
                <i className="fa fa-arrow-up" />
              </div>
              <div className="block-right">
                <div className="avatar-group" style={{ display: "flex" }}>
                  <div className="avatar">
                    <img src={require("../../assets/img/1.jpg")} alt='img1' />
                  </div>
                  <div className="avatar">
                    <img src={require("../../assets/img/2.jpg")} alt='img2' />
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <p>
              Each issue has a single reporter but can have multiple assignees
            </p>
            <div className="block" style={{ display: "flex" }}>
              <div className="block-left">
                <i className="fa fa-check-square" />
                <i className="fa fa-arrow-up" />
              </div>
              <div className="block-right">
                <div className="avatar-group" style={{ display: "flex" }}>
                  <div className="avatar">
                    <img src={require("../../assets/img/1.jpg")} alt='img1' />
                  </div>
                  <div className="avatar">
                    <img src={require("../../assets/img/2.jpg")} alt='img2' />
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul>
      </div>
      <div className="card" style={{ width: "17rem", height: "25rem" }}>
        <div className="card-header">SELECTED FOR DEVELOPMENT 2</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
        </ul>
      </div>
      <div className="card" style={{ width: "17rem", height: "25rem" }}>
        <div className="card-header">IN PROGRESS 2</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
        </ul>
      </div>
      <div className="card" style={{ width: "17rem", height: "25rem" }}>
        <div className="card-header">DONE 3</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul>
      </div> */
}
