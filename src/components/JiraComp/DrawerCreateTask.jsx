import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { Slider, Select } from "antd";
import * as Yup from "yup";
import { withFormik } from "formik";
import {
  CREATE_TASK_SAGA,
  GET_ALL_PROJECT_LIST_SAGA,
  GET_ALL_STATUS_ID_SAGA,
  GET_ALL_USER_SAGA,
  GET_MEMBERS_BY_PROJECT_ID_SAGA,
  GET_PRIORITY_SAGA,
  GET_TASK_TYPE_SAGA,
  SET_SUBMIT_CREATE_TASK,
} from "../../redux/constants/JiraProjectAction";



function DrawerCreateTask(props) {
  const editorRef = useRef(null);
  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });
  const dispatch = useDispatch();
  let projectList = useSelector((state) => state.JiraManagementReducer.projectArr);
  let taskTypeList = useSelector((state) => state.JiraDrawerContentReducer.taskTypeList );
  let priorityList = useSelector((state) => state.JiraDrawerContentReducer.priorityList);
 // let userList = useSelector((state) => state.JiraDrawerContentReducer.userList );
  let statusIdList = useSelector((state) => state.JiraDrawerContentReducer.statusIdList);
  let membersList = useSelector((state) => state.JiraDrawerContentReducer.membersList );
  const { values, touched, errors, handleChange, handleBlur, handleSubmit,setFieldValue } = props;
  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECT_LIST_SAGA });
    dispatch({ type: GET_TASK_TYPE_SAGA });
    dispatch({ type: GET_PRIORITY_SAGA });
    dispatch({ type: GET_ALL_USER_SAGA });
    dispatch({ type: GET_ALL_STATUS_ID_SAGA});
    //dispatch function handleSubmit to JiraDrawerReducer to update the event of submit button
    dispatch({type: SET_SUBMIT_CREATE_TASK, payload: handleSubmit});
  }, []);
  const renderProjectList = () => {
    return projectList.map((project, index) => (
      <option value={project.id} key={index}>
        {project.projectName}
      </option>
    ));
  };
  const renderTaskType = () => {
    return taskTypeList.map((task, index) => (
      <option value={task.id} key={index}>
        {task.taskType}
      </option>
    ));
  };
  const renderPriority = () => {
    return priorityList.map((item, index) => (
      <option key={index} value={item.priorityId}>
        {item.priority}
      </option>
    ));
  };
  const renderStatus =()=>{
    return statusIdList.map((item, index)=> (
      <option key={index} value={item.statusId}>
        {item.statusName}
      </option>
    ))
  }

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group">
        <p>Project</p>
        <select
          name="projectId"
          className="custom-select"
          onChange={(e)=>{
            //update projectId
            setFieldValue('projectId', e.target.value);
            //dispatch action with projectId to get all members of the project
            dispatch({type: GET_MEMBERS_BY_PROJECT_ID_SAGA, payload: e.target.value})
          }}
        >
          {renderProjectList()}
        </select>
      </div>
      <div className="form-group">
        <p>Task name</p>
        <input  type='text' className="form-control"
          name="taskName"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <p>Status</p>
        <select
          name="statusId"
          className="custom-select"
          onChange={handleChange}
        >
          {renderStatus()}
        </select>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Priority</p>
            <select
              name="priorityId"
              className="custom-select"
              onChange={handleChange}
            >
              {renderPriority()}
            </select>
          </div>
          <div className="col-6">
            <p>Task type</p>
            <select
              name="typeId"
              className="custom-select"
              onChange={handleChange}
            >
              {renderTaskType()}
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Assignees</p>
            <Select
              mode="multiple"
              size="large"
              placeholder="Please select"
              options={membersList?.map((item, index) => ({
                value: item.userId,
                label: item.name,
              }))}
              optionFilterProp="label"
              onSelect={(value) =>{ //console.log(value)
              }}
              onChange={(selectedValuesList) => setFieldValue('listUserAsign', selectedValuesList)}
              style={{width: "100%"}}
            ></Select>
          </div>
          <div className="col-6">
            <p>Time tracking</p>
            <Slider
              defaultValue={timeTracking.timeTrackingSpent}
              value={timeTracking.timeTrackingSpent}
              max={
                Number(timeTracking.timeTrackingSpent) +
                Number(timeTracking.timeTrackingRemaining)
              }
            />
            <div className="row">
              <div className="col-6">
                {timeTracking.timeTrackingSpent} h logged
              </div>
              <div className="col-6 text-right">
                {timeTracking.timeTrackingRemaining}h remaining
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Original estimate</p>
            <input
              type="number"
              min="0"
              defaultValue="0"
              name="originalEstimate"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="col-3">
            <p>Time spent</p>
            <input
              type="number"
              min="0"
              defaultValue="0"
              name="timeTrackingSpent"
              className="form-control"
              onChange={(e) => {
                setTimeTracking({
                  ...timeTracking,
                  timeTrackingSpent: e.target.value,
                });
                setFieldValue('timeTrackingSpent',e.target.value)
              }}
            />
          </div>
          <div className="col-3">
            <p>Time remaining</p>
            <input
              type="number"
              min="0"
              defaultValue="0"
              name="timeTrackingRemaining"
              className="form-control"
              onChange={(e) => {
                setTimeTracking({
                  ...timeTracking,
                  timeTrackingRemaining: e.target.value,
                });
                setFieldValue('timeTrackingRemaining',e.target.value)
              }}
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <p>Description</p>
        <Editor
          name="description"
          onInit={(evt, editor) => (editorRef.current = editor)}
          onEditorChange={()=> 
            //values.description = editorRef.current.getContent()
            setFieldValue('description', editorRef.current.getContent())
          }
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
      </div>
    </form>
  );
}
const CreateTaskForm = withFormik({
  mapPropsToValues: (props) => {
    let {projectList, taskTypeList, priorityList,statusIdList} = props;
    return {
     listUserAsign: [],
     taskName: "",
     description: "",
     statusId: statusIdList[0]?.statusId,
     originalEstimate: 0,
     timeTrackingSpent: 0,
     timeTrackingRemaining: 0,
     projectId: projectList[0]?.id,
     typeId: taskTypeList[0]?.id,
     priorityId: priorityList[0]?.priorityId,
    };
  },
  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({type: CREATE_TASK_SAGA, payload: values});
    console.log('values',values);
    setSubmitting(false);
  },
  displayName: "CreateTaskForm",
})(DrawerCreateTask);
const mapStateToProps = (state)=>({
  projectList:state.JiraManagementReducer.projectArr,
  taskTypeList: state.JiraDrawerContentReducer.taskTypeList,
  priorityList: state.JiraDrawerContentReducer.priorityList,
  statusIdList: state.JiraDrawerContentReducer.statusIdList,
})
export default connect(mapStateToProps)(CreateTaskForm);
