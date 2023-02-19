import React, { Fragment,useState } from "react";
import { Link, useLocation,useNavigate  } from "react-router-dom"; 
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import cogoToast from 'cogo-toast';
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { POST_METHOD } from "../../components/Constants/Method"
import useHttp from '../../components/CustomHook/useApi'

const VerificationOfOtp = () => {
  const navigate = useNavigate();
  let { pathname } = useLocation();
  const { sendRequest } = useHttp();

  const [userDetail, setUserDetail] = useState({
    otp: 0,
  });

  const validations = {
    otp: userDetail.otp.length > 5 ? true : false
  };
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserDetail({
      ...userDetail,
      [name]: value,
    });
  };

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
          url: POST_METHOD.otpVerification,
          method: "POST",
          body: { ...userDetail,userId:sessionStorage.getItem('userId') }
        },
        (data) => {
          if (data.success) {
            cogoToast.success(data.description, {position: "top-right"});
            sessionStorage.setItem("userId", data.responseData);
            navigate('/SetNewPassword', { replace: true });
          } else {
            cogoToast.error(data.description, {position: "top-right"});
          }
        }
      );
    }
  };

  return (
    <Fragment>
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Otp Verification", path: process.env.PUBLIC_URL + pathname }
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
                          <h4>Otp Verification</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form  onSubmit={onSubmit}>
                              <input
                                type="number"
                                name="otp"
                                placeholder="Otp"
                                value={userDetail.otp}
                                onChange={onChange}
                                style={{ border: (isFormSubmitted && !validations.otp) && "1px solid red" }}
                              />
                              <div className="button-box">
                                <button type="submit">
                                  <span>Submit</span>
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

export default VerificationOfOtp;
