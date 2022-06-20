import { Editor } from '@tinymce/tinymce-react'
import React, { useRef, useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {withFormik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import { GET_ALL_PROJECT_CATEGORIES_SAGA } from '../../redux/constants/JiraProjectAction';

 function DrawerContent(props) {
    const editorRef = useRef(null);
    const {values,touched,errors,handleChange,handleBlur,handleSubmit} = props;
    const dispatch = useDispatch();
    let {projectList} = useSelector(state => state.JiraProjectReducer);

    //component did mounted
    useEffect(() => {
        //call API to get all project categories
        dispatch({type: GET_ALL_PROJECT_CATEGORIES_SAGA})
        //send data when submitting the form
        dispatch({type: 'SUBMIT_EDITED_PROJECT', payload: handleSubmit})
    },[])

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
    <form onSubmit={handleSubmit}  className="container-fluid">
        <div className="row">
        <div className="col-4">
                <div className="form-group">
                    <label >Project id</label>
                    <input disabled name='id' value={values.id} type="text" className="form-control" />
                </div>
            </div>
            <div className="col-4">
                <div className="form-group">
                    <label >Project name</label>
                    <input name='projectName' value={values.projectName} onChange={handleChange} type="text"  className="form-control"/>
                </div>
            </div>
            <div className="col-4">
                <div className="form-group">
                    <label >Project category</label>
                    <select value={values.categoryId} name='categoryId' onChange={handleChange} className="custom-select mb-4">
                     {renderProjectTypes()}
                    </select>
                </div>
            </div>
            
        </div>
        <div className="row">
            <div className="col-12">
                <div className="form-group">
                    <label >Description</label>
                <Editor
          name="description"
          onInit={(evt, editor) => editorRef.current = editor}
          onEditorChange={()=> values.description = editorRef.current.getContent()}
          initialValue={values.description}
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
                </div>
            </div>
        </div>
    </form>
  )
}
const DrawerContentForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        //props: list from mapStateToProps
        // console.log(props)
        let {editedProject} = props;
      return ({ 
        id: editedProject?.id,
        projectName: editedProject.projectName, 
        description: editedProject.description,
        categoryId: editedProject.categoryId,
        // creator: editedProject.creator,
      })
    },
    // Custom sync validation
    validationSchema: Yup.object().shape({
      projectName: Yup.string()
       .min(5, 'Too Short!')
       .max(20, 'Too Long!')
       .required('Required'),
      description: Yup.string()
       .required('Required'),
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
      setSubmitting(false)
      props.dispatch({type: 'UPDATE_PROJECT_SAGA', payload: values})
    },
    displayName: 'CreateProjectForm',
  })(DrawerContent);
  
  const mapStateToProps = state => ({
    editedProject: state.JiraDrawerContentReducer.editedProject
  })
  
  export default connect(mapStateToProps)(DrawerContentForm);