import React from 'react'
import {useEffect} from 'react'
import { connect, useDispatch } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';

 function DrawerCreateUser(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;
  const dispatch = useDispatch();
  useEffect(()=>{
    //send data when submit form
    dispatch({
      type: 'SUBMIT_CREATED_USER_INFO',
      payload: handleSubmit
    })
  },[])
  return (
    <div className='d-flex justify-content-center align-items-center container mt-5' >
      <form onSubmit={handleSubmit} className='w-75'>
      <p className='mb-4 text-center display-6'>Create a new user</p>
  {/*Name input */}
  <div className="row mb-1">
    <div className="form-group">
        <input  name= 'name'
                value= {values.name}
                onChange={handleChange}
                type="text" className="form-control" placeholder="Name"/>  
        <p className='text-danger'> {errors.name} </p>
    </div>
    </div>
    
  {/* Email input */}
    <div className="row mb-1">
    <div className="form-group">
        <input  name= 'email'
                value= {values.email}
                onChange={handleChange}
                type="email" className="form-control" placeholder="Email"/>  
        <p className='text-danger'> {errors.email} </p>
    </div>
    </div>
  {/* Password input */}
  <div className="row mb-1">
    <div className="form-group">
        <input  name= 'passWord'
                value= {values.passWord}
                onChange={handleChange}
                type="password" className="form-control" placeholder="Password"/>  
        <p className='text-danger'> {errors.passWord} </p>
    </div>
    </div>
  {/* Phone number */}
  <div className="row mb-1">
    <div className="form-group">
        <input  name= 'phoneNumber'
                value= {values.phoneNumber}
                onChange={handleChange}
                type="text" className="form-control" placeholder="Phone number"/>  
         <p className='text-danger'> {errors.phoneNumber} </p>
    </div>
    </div> 
</form>
</div>
  )
}
const CreateUserForm = withFormik({
    mapPropsToValues: (props) => {
        // Init form field
        return ({ 
            name: '',
            email: '',
            passWord: '',
            phoneNumber: '',
        })
    },
   // Custom sync validation
   validationSchema:Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    passWord: Yup.string()
                .min(6, "Minimum 6 characters")
                .required("Required!")
                .matches(/(?=.*[0-9])/, "Password must contain a number."),
    phoneNumber: Yup.number()
                .min(6, 'Too Short!')
                .required('Required!'),
   }),
   handleSubmit: (values, {props, setSubmitting }) => {
    // console.log(props)
    console.log('values',values)

    props.dispatch({type: 'SIGN_UP_SAGA', payload: values})
    setSubmitting(false);
   },
   displayName: 'Create user Form',
})(DrawerCreateUser)
export default connect()(CreateUserForm);
