import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext } from "react";
import clsx from "clsx";
import cogoToast from 'cogo-toast';
import MenuCart from "./sub-components/MenuCart";
import { POST_METHOD } from "../../components/Constants/Method"
import React, { useState, useEffect, useCallback } from "react";
import useHttp from '../../components/CustomHook/useApi'
import { CartContext } from "../../components/product/ProductModal";

const userId = sessionStorage.getItem('userId')
const jwtToken = sessionStorage.getItem('Jwt Token')
console.log(userId);
console.log(jwtToken);

const IconGroup = ({ iconWhiteClass }) => {
  const handleClick = e => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };
  const navigate = useNavigate();
  const { compareItems } = useSelector((state) => state.compare);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);
  const [cartDetails,setCartDetails] = useState([])
  const { sendRequest } = useHttp();

  // const item = useContext(CartContext);
  // console.log(item);

  const viewCartItem = () => {
  // sendRequest(
  //   {
  //     url: POST_METHOD.getCartDetails,
  //     method: "POST",
  //     body: { userId:sessionStorage.getItem('userId')}
  //   },
  //   (data) => {
  //     if (data.success) {
  //       // cogoToast.success(data.description, { position: "bottom-left" });
  //       setCartDetails(data.responseData.items)
  //       // setTotal(data.total)
  //     } else {
  //       // cogoToast.success(data.description, { position: "bottom-left" });
  //     }
  //   }
  // );
  }

  useEffect(() => {
    // viewCartItem();
}, [sendRequest])

const Logout = () => {
   sendRequest(
    {
      url: POST_METHOD.userLogout,
      method: "POST",
      body: { userId:sessionStorage.getItem('userId'), jwtToken:sessionStorage.getItem('Jwt Token')}
    },
    (data) => {
      if (data.success) {
        cogoToast.success(data.description, { position: "bottom-left" });
        navigate('/', { replace: true });
        sessionStorage.clear()
        window.location.reload()
      } else {
        cogoToast.success(data.description, { position: "bottom-left" });
      }
    }
  );
}

  return (
    <div className={clsx("header-right-wrap", iconWhiteClass)} >
      
      {  ((userId !== null) && (jwtToken !== null))  && 
      <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={e => handleClick(e)}
        >
          <i className="pe-7s-user-female" />
        </button>
        <div className="account-dropdown">
          <ul>
            <li>
              <Link to={process.env.PUBLIC_URL + "/my-account"}>
                my account
              </Link>
            </li>
            <li>
              <Link onClick={Logout}>
              Log Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
      }
      {/* <div className="same-style header-compare">
        <Link to={process.env.PUBLIC_URL + "/compare"}>
          <i className="pe-7s-shuffle" />
          <span className="count-style">
            {compareItems && compareItems.length ? compareItems.length : 0}
          </span>
        </Link>
      </div> */}
      {/* <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style">
            {wishlistItems && wishlistItems.length ? wishlistItems.length : 0}
          </span>
        </Link>
      </div> */}
      { ((userId !== null) && (jwtToken !== null))  && 
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={e => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
          {cartItems && cartItems.length ? cartItems.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart />
      </div>
}
{  ((userId !== null) && (jwtToken !== null)) && 
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
          {cartItems && cartItems.length ? cartItems.length : 0}
          </span>
        </Link>
      </div>
}
{  ((userId !== null) && (jwtToken !== null))  && 
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
}
    </div>
  
  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};



export default IconGroup;
