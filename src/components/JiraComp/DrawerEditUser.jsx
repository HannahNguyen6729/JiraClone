import { withFormik } from 'formik';
import React, {useEffect} from 'react'
import { connect, useDispatch } from 'react-redux';
import { UPDATE_USER_INFO_SAGA } from '../../redux/constants/JiraProjectAction';


function DrawerEditUser(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;
      const dispatch = useDispatch();
      useEffect(() => {
         //send data when submit form
         dispatch({type: 'SUBMIT_EDITED_USER_INFO', payload: handleSubmit})
      },[])
  return (
    <div className="container d-flex justify-content-center mt-5" >
    <form onSubmit={handleSubmit} className='w-75'>
      {/*User ID */}
  <div className="row mb-1">
    <div className="form-group">
        <label className='font-weight-bold'>User ID</label>
        <input  name= 'id'
                value= {values.id}
                disabled={true}
                type="text" className="form-control" />  
       
    </div>
    </div>
  {/*Name input */}
  <div className="row mb-1">
    <div className="form-group">
    <label className='font-weight-bold'>Name</label>
        <input  name= 'name'
                value= {values.name}
                onChange={handleChange}
                type="text" className="form-control" />  
       
    </div>
    </div>
    
  {/* Email input */}
    <div className="row mb-1">
    <div className="form-group">
    <label className='font-weight-bold'>Email</label>
        <input  name= 'email'
                value= {values.email}
                onChange={handleChange}
                type="email" className="form-control" />  
    </div>
    </div>
 
  {/* Phone number */}
  <div className="row mb-1">
    <div className="form-group">
    <label className='font-weight-bold'>Phone number</label>
        <input  name= 'phoneNumber'
                value= {values.phoneNumber}
                onChange={handleChange}
                type="text" className="form-control" />  
    </div>
    </div>
</form>
    </div>
  )
}
const EditUserInfoForm = withFormik({
    enableReinitialize: true, //reset the form if initialValue changes
    mapPropsToValues: (props) => {
       // console.log(props.userInfo)
        const {id, name, email, passWord, phoneNumber} = props.userInfo
        // Init form field
        return ({ 
            id,
            name,
            email,
            passWord,
            phoneNumber,
        })
    },
   
   handleSubmit: (values, {props, setSubmitting }) => {
     //console.log(props)
    console.log('values',values)
    props.dispatch({type: UPDATE_USER_INFO_SAGA, payload: values})
    setSubmitting(false);
   },
   displayName: 'RegisterForm',
})(DrawerEditUser)

const mapStateToProps = (state) => ({
     userInfo: state.JiraDrawerContentReducer.editedUserInfo
})
export default connect(mapStateToProps)(EditUserInfoForm);
