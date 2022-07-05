import React from 'react'
import { withFormik } from 'formik';
import * as Yup from 'yup';

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
      <form onSubmit={handleSubmit}>
      <p className='mb-4 text-center display-6'>Create account</p>
  {/* 2 column grid layout with text inputs for the first and last names */}
  <div className="row mb-4">
    <div className="col">
      <div className="form-group ">
        <input  name= 'firstName'
                value= {values.firstName}
                onChange={handleChange}
                type="text" className="form-control" placeholder="First name"/>  
        <p className='text-danger'> {errors.firstName} </p>
      </div>
    </div>
    <div className="col">
        <div className="form-group ">
            <input  name= 'lastName'
                    value= {values.lastName}
                    onChange={handleChange}
                    type="text" className="form-control" placeholder="Last name"/>  
            <p className='text-danger'> {errors.lastName} </p>
        </div>
    </div>
  </div>
  {/* Email input */}
    <div className="row mb-3">
    <div className="form-group ">
        <input  name= 'email'
                value= {values.email}
                onChange={handleChange}
                type="email" className="form-control" placeholder="Email"/>  
        <p className='text-danger'> {errors.email} </p>
    </div>
    </div>
  {/* Password input */}
  <div className="row mb-3">
    <div className="form-group">
        <input  name= 'password'
                value= {values.password}
                onChange={handleChange}
                type="password" className="form-control" placeholder="Password"/>  
        <p className='text-danger'> {errors.password} </p>
    </div>
    </div>
  {/* Phone number */}
  <div className="row mb-3">
    <div className="form-group">
        <input  name= 'phoneNumber'
                value= {values.phoneNumber}
                onChange={handleChange}
                type="number" className="form-control" placeholder="Phone number"/>  
         <p className='text-danger'> {errors.phoneNumber} </p>
    </div>
    </div>
  {/* Checkbox */}
  <div className="form-check d-flex justify-content-center mb-4">
    <input className="form-check-input me-2" type="checkbox" defaultValue id="form2Example33" defaultChecked />
    <label className="form-check-label" htmlFor="form2Example33">
      Subscribe to our newsletter
    </label>
  </div>
  {/* Submit button */}
  <button type="submit" className="btn btn-primary btn-block mb-4">Sign up</button>
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
    mapPropsToValues: () => {
        // Init form field
        return ({ 
            firstName: '' ,
            lastName: '',
            email: '',
            password: '',
            phoneNumber: '',
        })
    },
   // Custom sync validation
   validationSchema:Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
                .min(6, "Minimum 6 characters")
                .required("Required!")
                .matches(/(?=.*[0-9])/, "Password must contain a number."),
    phoneNumber: Yup.number()
                .min(6, 'Too Short!')
                .required('Required!'),
   }),
   handleSubmit: (values, { setSubmitting }) => {
    console.log(values)
    setSubmitting(false);
   },
   displayName: 'RegisterForm',
})(Register)
export default MyRegisterForm;
