import { POST_METHOD } from "../../Constants/Method"
import React, { useState, useEffect, useCallback } from "react";
import useHttp from '../../CustomHook/useApi'
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import cogoToast from 'cogo-toast';

const MobileNavMenu = () => {
  const { t } = useTranslation();
  const { sendRequest } = useHttp();
  const navigate = useNavigate();
  const Logout = () => {
    console.log('Hello');
    sendRequest(
     {
       url: POST_METHOD.userLogout,
       method: "POST",
       body: { userId:sessionStorage.getItem('userId'), jwtToken:sessionStorage.getItem('Jwt Token')}
     },
     (data) => {
      console.log('HELLO');
       if (data.success) {
         sessionStorage.clear()
         cogoToast.success(data.description, { position: "bottom-left" });
         navigate('/', { replace: true });
         window.location.reload()
       } else {
         cogoToast.success(data.description, { position: "bottom-left" });
       }
     }
   );
 }

  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li>
          <Link to={process.env.PUBLIC_URL + "/"}>home</Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/my-account"}>
            My Account
          </Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/about"}>
           About Us
          </Link>
        </li>
        <li>
          <Link onClick={Logout} to="/login-register">
            Log Out
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavMenu;
