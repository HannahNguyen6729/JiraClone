import React from 'react'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

function Register(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;
  return (
    <div className='d-flex justify-content-center align-items-center container' style={{ height: window.innerHeight }}>
      <form onSubmit={handleSubmit} className='w-75'>
      <p className='mb-4 text-center display-6'>Create account</p>
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
  {/* Checkbox */}
  <div className="form-check d-flex justify-content-center mb-3">
    <input className="form-check-input me-2" type="checkbox" defaultValue id="form2Example33" defaultChecked />
    <label className="form-check-label" htmlFor="form2Example33">
      Subscribe to our newsletter
    </label>
  </div>
  {/* Submit button */}
  <button type="submit" className="btn btn-primary btn-block mb-3">Sign up</button>
  {/* Register buttons */}
  <div className="text-center">
    <p>or sign up with:</p>
    <button type="button" className="btn btn-primary btn-floating mx-1">
      <i className="fab fa-facebook-f" />
    </button>
    <button type="button" className="btn btn-primary btn-floating mx-1">
      <i className="fab fa-google" />
    </button>
    <button type="button" className="btn btn-primary btn-floating mx-1">
      <i className="fab fa-twitter" />
    </button>
    <button type="button" className="btn btn-primary btn-floating mx-1">
      <i className="fab fa-github" />
    </button>
  </div>
</form>
</div>
  )
}

const MyRegisterForm = withFormik({
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
                .matches(/(?=.*[0-9])/, "Password must contain a number.")
                .required("Required!"),
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
   displayName: 'RegisterForm',
})(Register)
export default connect()(  MyRegisterForm);
