import React, { useRef, useEffect} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {useSelector, useDispatch } from 'react-redux';
import {withFormik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import { CREATE_PROJECT_SAGA, GET_ALL_PROJECT_CATEGORIES_SAGA } from '../../redux/constants/JiraProjectAction';

 function JiraProject(props) {
  let {projectList} = useSelector(state => state.JiraProjectReducer);
  let dispatch = useDispatch();
  const {values,touched,errors,handleChange,handleBlur,handleSubmit} = props;
  const editorRef = useRef(null);

  //call API to get all project categories
  useEffect(()=>{
    dispatch({type: GET_ALL_PROJECT_CATEGORIES_SAGA})
  },[]);
  const updateProjectName =(name)=> {
    switch(name){
      case 'Dự án web': {return 'WEB'}
      case 'Dự án phần mềm':{return 'SOFTWARE'}
      case 'Dự án di động': {return 'MOBILE'}
      default: return;
    }
  }
  const renderProjectTypes = ()=>{
    return projectList.map((item, index)=> {
      return (
      <option value={item.id} key={index} > 
      {updateProjectName(item.projectCategoryName)} 
      </option>
    )})
  }
  
  return (
    <div className="container mt-5 mx-4">
      <h4 >Create a new project</h4>
      <form onSubmit = {handleSubmit}>
        <div className="mb-4">
          <label className="form-label">Project name</label>
          <input type="text" className="form-control" name="projectName" onChange={handleChange} value={values.projectName} />
          <div className="text-danger">{errors.projectName}</div>
        </div>
        <div className="mb-4">
          <label>Description</label>
          <Editor
          name="description"
          onInit={(evt, editor) => editorRef.current = editor}
          onEditorChange={()=> values.description = editorRef.current.getContent()}
          initialValue=''
          apiKey='9x3xuep5oz6fmn5e1k3rzi45hokvedu8p9vcc92h4dlbivp9'
          init={{
                height: 300,
                menubar: false,
                plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <div className="text-danger">{errors.description}</div>
        </div>
        <select value={values.categoryId} name='categoryId' onChange={handleChange} className="custom-select mb-4">
          {renderProjectTypes()}
        </select>
        <button className="btn btn-outline-primary" type="submit">
          Create project
        </button>
      </form>
    </div>
  );
}

const CreateProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    //props: list from mapStateToProps
    return ({ 
      projectName: '', 
      description: '',
      categoryId: props.list[0]?.id,
    })
  },
  // Custom sync validation
  validationSchema: Yup.object().shape({
    projectName: Yup.string()
     .min(5, 'Too Short!')
     .max(20, 'Too Long!')
     .required('Required'),
    description: Yup.string()
     .min(6, 'Too Short!')
     .max(200, 'Too Long!')
     .required('Required'),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    //console.log(values)
    props.dispatch({type: CREATE_PROJECT_SAGA, payload: values});
    setSubmitting(false)
  },

  displayName: 'CreateProjectForm',
})(JiraProject);

const mapStateToProps = state => ({
  list: state.JiraProjectReducer.projectList
})

export default connect(mapStateToProps)(CreateProjectForm);