import React from "react";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector, useDispatch } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import {
  ADD_COMMENT_TO_TASK_SAGA,
  ADD_MEMBER_TO_TASK,
  CHANGE_DETAIL_TASK_MODAL,
  DELETE_COMMENT_SAGA,
  DELETE_MEMBER_IN_TASK,
  GET_ALL_STATUS_ID_SAGA,
  GET_PRIORITY_SAGA,
  GET_TASK_TYPE_SAGA,
  UPDATE_COMMENT_SAGA,
  UPDATE_TASK_DETAIL_SAGA,
} from "../../redux/constants/JiraProjectAction";

export default function InfoModal() {
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const detailTaskModal = useSelector(
    (state) => state.JiraDetailTaskModalReducer
  );
  let priorityList = useSelector(
    (state) => state.JiraDrawerContentReducer.priorityList
  );
  let statusIdList = useSelector(
    (state) => state.JiraDrawerContentReducer.statusIdList
  );
  let taskTypeList = useSelector(
    (state) => state.JiraDrawerContentReducer.taskTypeList
  );
  let projectDetail = useSelector(
    (state) => state.JiraManagementReducer.projectDetail
  );
  //console.log(projectDetail)
  let [visibleEditor, setVisibleEditor] = useState(false);
  let [editorContent, setEditorContent] = useState(detailTaskModal.description);
  let [comment, setComment] = useState("");
  let [editedCmt, setEditedCmt] = useState('');
  let [cmtId, setCmtId] = useState(null);
  
  useEffect(() => {
    dispatch({ type: GET_TASK_TYPE_SAGA });
    dispatch({ type: GET_PRIORITY_SAGA });
    dispatch({ type: GET_ALL_STATUS_ID_SAGA });
  }, []);
  useEffect(
    () => setEditorContent(detailTaskModal.description),
    [detailTaskModal.description]
  );

  const renderTaskName = () => {
    return (
      <textarea
        className="form-control"
        style={textAreaStyle}
        name="taskName"
        value={detailTaskModal.taskName}
        onChange={(e) => handleChange(e)}
      ></textarea>
    );
  };
  const renderTaskType = () => {
    return taskTypeList.map((item, index) => (
      <option value={item.id} key={index}>
        {item.taskType}
      </option>
    ));
  };
  const renderStatus = () => {
    return statusIdList.map((item, index) => (
      <option key={index} value={item.statusId}>
        {item.statusName}
      </option>
    ));
  };
  const renderPriority = () => {
    return priorityList.map((item, index) => (
      <option key={index} value={item.priorityId}>
        {item.description}
      </option>
    ));
  };
  const renderTimeTracking = () => {
    let { timeTrackingSpent, timeTrackingRemaining } = detailTaskModal;
    let total = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    let widthPercents = Math.round(Number((timeTrackingSpent / total) * 100));
    return (
      <>
        <div className="d-flex">
          <i className="fa fa-clock" />
          <div style={{ width: "100%" }}>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${widthPercents}%` }}
                aria-valuenow={timeTrackingSpent}
                aria-valuemin={timeTrackingRemaining}
                aria-valuemax={total}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="logged"> {timeTrackingSpent}h logged</p>
              <p className="estimate-time">
                {timeTrackingRemaining}h remaining
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex">
          <div className="form-group mr-3">
            <label>Time spent</label>
            <input
              name="timeTrackingSpent"
              onChange={handleChange}
              value={timeTrackingSpent}
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Time remaining</label>
            <input
              name="timeTrackingRemaining"
              onChange={handleChange}
              value={timeTrackingRemaining}
              type="text"
              className="form-control"
            />
          </div>
        </div>
      </>
    );
  };
  const renderMembers = () => {
    return detailTaskModal.assigness.map((item, index) => (
      <button
        key={index}
        onClick={
          () => {
            dispatch({
              type: UPDATE_TASK_DETAIL_SAGA,
              actionType: DELETE_MEMBER_IN_TASK,
              payload: item.id,
            });
          }
          // dispatch({type: DELETE_MEMBER_IN_TASK, payload: item.id})}
        }
        className="item d-flex align-items-center btn mb-2"
      >
        <div className="avatar">
          <img src={item.avatar} alt={item.name} />
        </div>
        <p className="name">
          {item.name}
          <i className="fa fa-times" style={{ marginLeft: 5 }} />
        </p>
      </button>
    ));
  };
  const renderDescription = () => {
    let jsxDescription = (
      <div
        onClick={() => {
          setVisibleEditor(!visibleEditor);
        }}
      >
        {ReactHtmlParser(detailTaskModal.description)}
      </div>
    );

    return (
      <>
        {visibleEditor ? (
          <>
            <Editor
              name="description"
              onInit={(evt, editor) => (editorRef.current = editor)}
              onEditorChange={(newText) => {
                setEditorContent(newText);
                // dispatch({type: CHANGE_DETAIL_TASK_MODAL,payload: {name:'description',value:newText}})
              }}
              value={editorContent}
              apiKey="9x3xuep5oz6fmn5e1k3rzi45hokvedu8p9vcc92h4dlbivp9"
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
            <div className="mb-4 mt-2">
              <button
                className="btn btn-primary mr-2"
                onClick={() => {
                  dispatch({
                    type: UPDATE_TASK_DETAIL_SAGA,
                    actionType: CHANGE_DETAIL_TASK_MODAL,
                    payload: { name: "description", value: editorContent },
                  });
                  // dispatch({
                  //   type: CHANGE_DETAIL_TASK_MODAL,
                  //   payload: { name: "description", value: editorContent },
                  // });
                  setVisibleEditor(false);
                }}
              >
                Save
              </button>
              <button
                className="btn btn-light"
                onClick={() => {
                  setVisibleEditor(false);
                }}
              >
                Close
              </button>
            </div>
          </>
        ) : (
          jsxDescription
        )}
      </>
    );
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    dispatch({
      type: UPDATE_TASK_DETAIL_SAGA,
      actionType: CHANGE_DETAIL_TASK_MODAL,
      payload: { name, value },
    });
    // dispatch({  type: CHANGE_DETAIL_TASK_MODAL,
    //             payload: { name, value }
    //           });
  };
  const handleChangeAddMem = (e) => {
    //value= userId
    let { name, value } = e.target;
    let selectedMember = projectDetail.members?.find(
      (item) => item.userId == value
    );
    selectedMember = { ...selectedMember, id: selectedMember.userId };
    dispatch({
      type: UPDATE_TASK_DETAIL_SAGA,
      actionType: ADD_MEMBER_TO_TASK,
      payload: selectedMember,
    });
    // dispatch({type: ADD_MEMBER_TO_TASK, payload: selectedMember })
  };
  const renderComments = ()=>{
    return detailTaskModal.lstComment.map((cmt, index) => {
      return (
        <div key={index} className="lastest-comment mt-4">
          <div className="comment-item">
            <div
              className="display-comment"
              style={{ display: "flex" }}
            >
              <div className="avatar">
                <img src={cmt.avatar} alt={cmt.name} />
              </div>
              <div className='w-100'>
                <p style={{ marginBottom: 5 }}>
                  <span className="font-weight-bold mr-2 text-uppercase">
                    {cmt.name}
                  </span>
                  <span>a month ago</span>
                </p>
               
                <div style={{ color: "#929398" }}>
                  {cmtId == cmt.id?
                   (<>
                    <input  
                            value={editedCmt} 
                            onChange={e=> setEditedCmt(e.target.value)}
                            type="text" className="form-control" />
                    <div>
                      <span onClick={()=> {
                                      dispatch({
                                      type:UPDATE_TASK_DETAIL_SAGA,
                                      actionType: UPDATE_COMMENT_SAGA,
                                      payload:{ id: cmt.id, contentComment:editedCmt}
                                    })
                                    setCmtId(null)
                      }} className="editComment mr-2" style={{cursor: "pointer"}}>
                      Save
                      </span>
                      •
                      <span onClick={() =>{setCmtId(null)}} className="deleteComment ml-2" style={{cursor: "pointer"}}>
                      Cancel
                      </span>
                    </div>
                    </>
                  ): (
                  <>
                   <div>{cmt.commentContent}</div>
                    <div>
                    <span onClick={()=> {
                          setCmtId(cmt.id)
                          setEditedCmt(cmt.commentContent)
                        }}
                          className="editComment mr-2" style={{cursor: "pointer"}}>
                      Edit
                    </span>
                    •
                    <span onClick={()=> dispatch({
                                              type: UPDATE_TASK_DETAIL_SAGA,
                                              actionType: DELETE_COMMENT_SAGA,
                                              payload: cmt.id
                                          })} 
                          className="deleteComment ml-2" style={{cursor: "pointer"}}>
                     Delete
                    </span>
                    </div>
                    </>
                  )}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })
  }
  const addCommentToTask = () => {
    return (
      <div className="block-comment" style={{ display: "flex" }}>
        <div className="avatar">
          <img src={require("../../assets/img/1.jpg")} alt="img1" />
        </div>
        <div className="input-comment">
          <input
            type="text"
            placeholder="Add a comment ..."
            className="form-control"
            name="contentComment"
            value={comment}
            onChange={(e) => {
              let { name, value } = e.target;
              setComment(value);
            }}
          />
          <div className="mt-2">
            <button
              className="btn btn-primary mr-2"
              onClick={() => {
                dispatch({
                  type: UPDATE_TASK_DETAIL_SAGA,
                  actionType: ADD_COMMENT_TO_TASK_SAGA,
                  payload: {
                    taskId: detailTaskModal.taskId,
                    contentComment: comment,
                  },
                });
                setComment('')
              }}
            >
              Save
            </button>
            <button className="btn btn-light" onClick={() => setComment('')}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };
  const textAreaStyle = {
    width: "100%",
    fontWeight: "300",
    fontSize: "14px",
    height: "40px",
    border: "1px solid transparent",
    resize: "none",
    cursor: "pointer",
    overflow: "auto",
    paddingLeft: 0,
  };
  return (
    <>
      {/* Info Modal */}
      <div
        className="modal fade"
        id="infoModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="infoModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-info">
          <div className="modal-content">
            <div className="modal-header">
              <div className="task-title">
                <i className="fa fa-bookmark" />
                <span>TASK-{detailTaskModal.taskId}</span>
              </div>
              <div style={{ display: "flex" }} className="task-click">
                <div>
                  <i className="fab fa-telegram-plane" />
                  <span style={{ paddingRight: 20 }}>Give feedback</span>
                </div>
                <div>
                  <i className="fa fa-link" />
                  <span style={{ paddingRight: 20 }}>Copy link</span>
                </div>
                <div>
                  <i
                    className="fa fa-trash-alt"
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-8">
                    <h6> Task name: </h6>
                    {renderTaskName()}
                    <div className="description mb-4 mt-3">
                      <h6>Description</h6>
                      {renderDescription()}
                    </div>
                    <div className="comment">
                      <h6>Comment</h6>
                      {/*Add comments */}
                      {addCommentToTask()}
                      {/*show comment*/}
                      {renderComments()}
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="taskType form-group">
                      <h6>TASK TYPE</h6>
                      <select
                        name="typeId"
                        value={detailTaskModal.typeId}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        className="custom-select"
                      >
                        {renderTaskType()}
                      </select>
                    </div>
                    <div className="status">
                      <h6>STATUS</h6>
                      <select
                        name="statusId"
                        value={detailTaskModal.statusId}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        className="custom-select"
                      >
                        {renderStatus()}
                      </select>
                    </div>
                    <div className="assignees form-group">
                      <h6>ASSIGNEES</h6>
                      <div className="d-flex flex-wrap">{renderMembers()}</div>
                      <select
                        value="-1"
                        name="memberList"
                        onChange={(e) => handleChangeAddMem(e)}
                        className="custom-select"
                      >
                        <option value="-1">+ Add more</option>
                        {projectDetail.members
                          ?.filter((mem) => {
                            let index = detailTaskModal.assigness?.findIndex(
                              (item) => item.id === mem.userId
                            );
                            if (index !== -1) {
                              //found match
                              return false;
                            }
                            return true;
                          })
                          .map((item, index) => (
                            <option value={item.userId} key={index}>
                              {" "}
                              {item.name}{" "}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div
                      className="priority form-group"
                      style={{ marginBottom: 20 }}
                    >
                      <h6>PRIORITY</h6>
                      <select
                        name="priorityId"
                        value={detailTaskModal.priorityId}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        className="custom-select"
                      >
                        {renderPriority()}
                      </select>
                    </div>
                    <div className="estimate form-group">
                      <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                      <input
                        type="text"
                        className="estimate-hours form-control"
                        name="originalEstimate"
                        value={detailTaskModal.originalEstimate}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </div>
                    <div className="time-tracking form-group">
                      <h6>TIME TRACKING (HOURS)</h6>
                      {renderTimeTracking()}
                    </div>
                    <div style={{ color: "#929398" }}>
                      Create at a month ago
                    </div>
                    <div style={{ color: "#929398" }}>
                      Update at a few seconds ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/*<div style={{ fontWeight: 500, marginBottom: 10 }}>
                      Jira Software (software projects) issue types:
                    </div>
                    <div className="title">
                      <div className="title-item">
                        <h5>
                          BUG <i className="fa fa-bug" />
                        </h5>
                        <p>
                          A bug is a problem which impairs or prevents the
                          function of a product.
                        </p>
                      </div>
                      <div className="title-item">
                        <h5>
                          TASK <i className="fa fa-tasks" />
                        </h5>
                        <p>A task represents work that needs to be done</p>
                      </div>
                    </div>*/

/*show comments */
/* <div className="lastest-comment">
                        <div className="comment-item">
                          <div
                            className="display-comment"
                            style={{ display: "flex" }}
                          >
                            <div className="avatar">
                              <img
                                src={require("../../assets/img/2.jpg")}
                                alt="img2"
                              />
                            </div>
                            <div>
                              <p style={{ marginBottom: 5 }}>
                                Lord Gaben <span>a month ago</span>
                              </p>
                              <p style={{ marginBottom: 5 }}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Repellendus tempora ex
                                voluptatum saepe ab officiis alias totam ad
                                accusamus molestiae?
                              </p>
                              <div>
                                <span style={{ color: "#929398" }}>Edit</span>•
                                <span style={{ color: "#929398" }}>Delete</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */
