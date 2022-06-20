import React from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input, Button, Form, Checkbox } from "antd";
import { withFormik } from "formik";
import * as Yup from "yup";
import {connect} from 'react-redux';
import { logInAction } from "../../redux/actions/LoginSagaActions";

function UserLogin(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  
  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ height: window.innerHeight }}
    >
      <div>
        <h3 className="display-6">Login</h3>
        <Form
          name="normal_login"
          className="login-form"
          style={{ minWidth: 400 }}
          onFinish={() => handleSubmit()}
        >
          <Form.Item>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              size="large"
              type="email"
              name="email"
              onChange={handleChange}
            />
            <div className="input-feedback text-danger">{errors.email}</div>
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              size="large"
              name="password"
              onChange={handleChange}
            />
            <div className="input-feedback text-danger">{errors.password}</div>
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a
              className="login-form-forgot"
              href="./login"
              style={{ float: "right" }}
            >
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
              size="large"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center ">
          <p className="mt-4">
            Not a member? <a href="#!">Register</a>
          </p>
          <p>or sign up with:</p>
          {/* Grid container */}
          <div className="container p-2 pb-0">
            {/* Section: Social media */}
            <section className="mb-4">
              {/* Facebook */}
              <a
                className="btn btn-primary btn-floating m-1"
                style={{ backgroundColor: "#3b5998" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-facebook-f" />
              </a>
              {/* Twitter */}
              <a
                className="btn btn-primary btn-floating m-1"
                style={{ backgroundColor: "#55acee" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-twitter" />
              </a>
              {/* Google */}
              <a
                className="btn btn-primary btn-floating m-1"
                style={{ backgroundColor: "#dd4b39" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-google" />
              </a>
              {/* Instagram */}
              <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: '#ac2bac'}} href="#!" role="button"><i className="fab fa-instagram" /></a>
              {/* Linkedin */}
              <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: '#0082ca'}} href="#!" role="button"><i className="fab fa-linkedin-in" /></a>
              {/* Github */}
              <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: '#333333'}} href="#!" role="button"><i className="fab fa-github" /></a>
            </section>
            {/* Section: Social media */}
          </div>
          {/* Grid container */}
        </div>
      </div>
    </div>
  );
}

const MyEnhancedForm = withFormik({
  mapPropsToValues: () => ({ email: "", password: "" }),
  validationSchema: Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(4, "Too short")
      .max(30, "Too long")
      .required("Required")
      .matches(/(?=.*[0-9])/, "Password needs at least 1 number"),
  }),

  handleSubmit: (values, {setSubmitting, props}) => {
    setSubmitting(false);
    props.dispatch(logInAction(values.email, values.password))
  },
  displayName: "BasicForm",
})(UserLogin);
export default connect()(MyEnhancedForm) ;
