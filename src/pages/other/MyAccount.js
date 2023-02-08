import { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import cogoToast from 'cogo-toast';
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { POST_METHOD } from "../../components/Constants/Method"
import useHttp from '../../components/CustomHook/useApi'


const MyAccount = () => {
  let { pathname } = useLocation();
  const { sendRequest } = useHttp();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [updateUerDetails, setUpdateUserDetals] = useState({})
  const validation = {
    firstName: userDetails.firstName.length > 1 ? true : false,
    email: (userDetails.email.length >= 1 && userDetails.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) ? true : false,
    phone: userDetails.phone.length > 8 ? true : false
  }

  const onChange = (event) => {
    let name = event.target.name
    let value = event.target.value
    setUserDetails({
      ...userDetails,
      [name] : value
    })
    setUpdateUserDetals({
      [name] : value
    })
  }
  const getUserDetails = () => {
    sendRequest(
      {
        url: POST_METHOD.getUserDetails,
        method: "POST",
        body: { userId: sessionStorage.getItem('userId') }
      },
      (data) => {
        if (data.success) {
          setUserDetails(data.responseData)
        } else {
          // cogoToast.success(data.description, { position: "bottom-left" });
        }
      }
    );
  }

  useEffect(() => {
    getUserDetails();
  }, [])

  const updateDetails = () => {
    setIsFormSubmitted(true);
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
        url: POST_METHOD.userUpdate,
        method: "POST",
        body: {
          userId: sessionStorage.getItem('userId'), 
          jwtToken:sessionStorage.getItem('Jwt Token'),
          ...updateUerDetails
        },
        isFormData:false
      },
      (data) => {
        if (data.success) {
          cogoToast.success(data.description, { position: "bottom-left" });
          getUserDetails()
        } else {
          cogoToast.error(data.description, { position: "bottom-left" });
        }
      }
    );
  }
  }
  return (
    <Fragment>
      <SEO
        titleTemplate="My Account"
        description="My Account page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "My Account", path: process.env.PUBLIC_URL + pathname }
          ]}
        />

        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ms-auto me-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0" className="single-my-account mb-20">
                      <Accordion.Header className="panel-heading">
                        <span>1 .</span> Edit your account information{" "}
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper">
                            <h5>Your Personal Details</h5>
                          </div>
                          <div className="row">
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>First Name</label>
                                <input type="text" value={userDetails.firstName} onChange={onChange} name="firstName" style={{ border: (isFormSubmitted && !validation.firstName) && "1px solid red" }}/>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>Last Name</label>
                                <input type="text" value={userDetails.lastName} name="lastName" onChange={onChange}/>
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>Email Address</label>
                                <input type="email" value={userDetails.email} name="email" onChange={onChange} style={{ border: (isFormSubmitted && !validation.email) && "1px solid red" }}/>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>Telephone</label>
                                <input type="tel" value={userDetails.phone} name="phone" onChange={onChange} style={{ border: (isFormSubmitted && !validation.phone) && "1px solid red" }}/>
                              </div>
                            </div>
                          </div>
                          <div className="billing-back-btn">
                            <div className="billing-btn">
                              <button type="submit" onClick={updateDetails}>Update Details</button>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>


                    {/* <Accordion.Item eventKey="1" className="single-my-account mb-20">
                      <Accordion.Header className="panel-heading">
                        <span>2 .</span> Change your password
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper">
                            <h4>Change Password</h4>
                            <h5>Your Password</h5>
                          </div>
                          <div className="row">
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>Password</label>
                                <input type="password" />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>Password Confirm</label>
                                <input type="password" />
                              </div>
                            </div>
                          </div>
                          <div className="billing-back-btn">
                            <div className="billing-btn">
                              <button type="submit">Continue</button>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item> */}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default MyAccount;
