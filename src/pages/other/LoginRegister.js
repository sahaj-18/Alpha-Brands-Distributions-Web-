import React, { Fragment, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import cogoToast from 'cogo-toast';
import Form from 'react-bootstrap/Form'
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { POST_METHOD } from "../../components/Constants/Method"
import useHttp from '../../components/CustomHook/useApi'

const LoginRegister = () => {
  const navigate = useNavigate();
  let { pathname } = useLocation();
  const { sendRequest } = useHttp();

  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
  });
  const [userDetails,setUserDetails] = useState({
    firstName: "",
    email: "",
    lastName:"",
    phone: "",
    password: "",
    type: "",
    taxId: ""
  })
  const [userTypes,setUserTypes] = useState(false);
  const validations = {
    email: (userDetail.email.length >= 1 && userDetail.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) ? true : false,
    password: userDetail.password.length >= 6 ? true : false,
  };
  const validation = {
    firstName: userDetails.firstName.length >= 1 ? true : false,
    email: (userDetails.email.length >= 1 && userDetails.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) ? true : false,
    phone: userDetails.phone.length >= 8 ? true : false,
    password: userDetails.password.length >= 6 ? true : false,
    taxId : userDetails.taxId.length >= 10 ? true : false,
    type: userDetails.type.length >= 1 ? true : false,

  }
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isRegisterFormSubmitted, setIsRegisterFormSubmitted] = useState(false);
  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserDetail({
      ...userDetail,
      [name]: value,
    });
  };
  const onChanges = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const userType = (event) => {
    if(event.target.value === 'Wholesaler'){
      setUserTypes(true)
      setUserDetails({
        ...userDetails,
        [event.target.name]: "2",
      });
    }else{
      setUserTypes(false)
      setUserDetails({
        ...userDetails,
        [event.target.name]: "1",
      });
    }
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setIsFormSubmitted(true);

    let isFormValid = true;
    Object.keys(validations).map((data) => {
      if (isFormValid) {
        isFormValid = validations[data];
      }
      return data;
    });
    if (isFormValid) {
      sendRequest(
        {
          url: POST_METHOD.userLogin,
          method: "POST",
          body: { ...userDetail }
        },
        (data) => {
          if (data.success) {
            sessionStorage.setItem(
              "Jwt Token",
              data.responseData.jwtToken
            );
            sessionStorage.setItem("userId", data.responseData._id);
            sessionStorage.setItem("type", data.responseData.type);
            sessionStorage.setItem("isApproved", data.responseData.isApproved);
            cogoToast.success(data.description, { position: "top-right" });
            navigate('/shop-grid-filter', { replace: true });
            window.location.reload();
          } else {
            cogoToast.error(data.description, { position: "top-right" });
          }
        }
      );
    }
  };

  const register = (event) => {
    event.preventDefault();
    setIsRegisterFormSubmitted(true);
    if(!userTypes){
      delete validation.taxId
    }
    let isFormValid = true;
    Object.keys(validation).map((data) => {
      if (isFormValid) {
        isFormValid = validation[data];
      }
      return data;
    });
    if (isFormValid) {
      sendRequest(
        {
          url: POST_METHOD.userRegistration,
          method: "POST",
          body: { ...userDetails }
        },
        (data) => {
          if (data.success) {
            sessionStorage.setItem(
              "Jwt Token",
              data.responseData.jwtToken
            );
            sessionStorage.setItem("userId", data.responseData._id);
            sessionStorage.setItem("type", data.responseData.type);
            sessionStorage.setItem("isApproved", data.responseData.isApproved);
            cogoToast.success(data.description, { position: "top-right" });
            navigate('/shop-grid-filter', { replace: true });
            window.location.reload();
          } else {
            cogoToast.error(data.description, { position: "top-right" });
          }
        }
      );
    }
  }
  return (
    <Fragment>
      <Breadcrumb
        pages={[
          { label: "Home", path: process.env.PUBLIC_URL + "/" },
          { label: "Login Register", path: process.env.PUBLIC_URL + pathname }
        ]}
      />
      <div className="login-register-area pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-12 ms-auto me-auto">
              <div className="login-register-wrapper">
                <Tab.Container defaultActiveKey="login">
                  <Nav variant="pills" className="login-register-tab-list">
                    <Nav.Item>
                      <Nav.Link eventKey="login">
                        <h4>Login</h4>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="register">
                        <h4>Register</h4>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content>
                    <Tab.Pane eventKey="login">
                      <div className="login-form-container">
                        <div className="login-register-form">
                          <form onSubmit={onSubmit}>
                            <input
                              type="email"
                              name="email"
                              placeholder="Email"
                              value={userDetail.email}
                              onChange={onChange}
                              style={{ border: (isFormSubmitted && !validations.email) && "1px solid red" }}
                            />
                            <input
                              type="password"
                              name="password"
                              placeholder="Password"
                              value={userDetail.password}
                              onChange={onChange}
                              style={{ border: (isFormSubmitted && !validations.password) && "1px solid red" }}
                            />
                            <div className="button-box">
                              <div className="login-toggle-btn">
                                <Link to={process.env.PUBLIC_URL + "/ForgotPassword"}>
                                  Forgot Password?
                                </Link>
                              </div>
                              <button type="submit">
                                <span>Login</span>
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="register">
                      <div className="login-form-container">
                        <div className="login-register-form">
                          <form onSubmit={register}>
                            <select  name="type" className="mb-4" onChange={userType} style={{ border: (isRegisterFormSubmitted && !validation.type) && "1px solid red" }}>
                              <option value="" disabled selected>Select User Type</option>
                              <option value="Retailer">Retailer</option>
                              <option value="Wholesaler">Wholesaler</option>
                            </select>
                            <input
                              type="text"
                              name="firstName"
                              placeholder="First Name"
                              value={userDetails.firstName}
                              onChange={onChanges}
                              style={{ border: (isRegisterFormSubmitted && !validation.firstName) && "1px solid red" }}
                            />
                            <input
                              type="text"
                              name="lastName"
                              placeholder="Last Name"
                              onChange={onChanges}
                            />
                            <input
                              name="email"
                              placeholder="Email"
                              type="email"
                              value={userDetails.email}
                              onChange={onChanges}
                              style={{ border: (isRegisterFormSubmitted && !validation.email) && "1px solid red" }}
                            />
                            <input
                              name="phone"
                              placeholder="Phone"
                              type="tel"
                              value={userDetails.phone}
                              onChange={onChanges}
                              style={{ border: (isRegisterFormSubmitted && !validation.phone) && "1px solid red" }}
                            />
                            <input
                              type="password"
                              name="password"
                              placeholder="Password"
                              value={userDetails.password}
                              onChange={onChanges}
                              style={{ border: (isRegisterFormSubmitted && !validation.password) && "1px solid red" }}
                            />
                            {userTypes && 
                            <input
                              type="text"
                              name="taxId"
                              placeholder="Tax Id"
                              value={userDetails.taxId}
                              onChange={onChanges}
                              style={{ border: (userTypes && isRegisterFormSubmitted && !validation.taxId) && "1px solid red" }}
                            />
                          }
                            <div className="button-box">
                              <button type="submit">
                                <span>Register</span>
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginRegister;
