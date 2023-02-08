import { Fragment } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDiscountPrice } from "../../../helpers/product";
import { deleteFromCart } from "../../../store/slices/cart-slice"
import cogoToast from 'cogo-toast';
import { POST_METHOD } from "../../Constants/Method"
import React, { useState, useEffect, useCallback } from "react";
import useHttp from '../../CustomHook/useApi'
// import { CartContext } from "../../../pages/other/Cart";



const MenuCart = () => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { sendRequest } = useHttp();
  const [cartDetails,setCartDetails] = useState([])
  // const item = useContext(CartContext);

  // console.log(cartItems);
  const viewCartItem = () => {
    sendRequest(
      {
        url: POST_METHOD.getCartDetails,
        method: "POST",
        body: { userId:sessionStorage.getItem('userId')}
      },
      (data) => {
        if (data.success) {
          // cogoToast.success(data.description, { position: "bottom-left" });
          setCartDetails(data.responseData.items)
          // setTotal(data.total)
        } else {
          // cogoToast.success(data.description, { position: "bottom-left" });
        }
      }
    );
  }

  const deleteItemFromCart = (productId) => {
    sendRequest(
      {
        url: POST_METHOD.deleteCartItems,
        method: "POST",
        body: { userId:sessionStorage.getItem('userId'),productId:productId}
      },
      (data) => {
        if (data.success) {
          cogoToast.success(data.description, { position: "bottom-left" });
          viewCartItem()
        } else {
          cogoToast.success(data.description, { position: "bottom-left" });
        }
      }
    );
  }

  useEffect(() => {
    viewCartItem();
}, [])

  return (
    <div className="shopping-cart-content">
      {cartItems && cartItems.length > 0 ? (
        <Fragment>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>
              view cart
            </Link>
            <Link
              className="default-btn"
              to={process.env.PUBLIC_URL + "/checkout"}
            >
              checkout
            </Link>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">No items added to cart</p>
      )}
    </div>
  );
};

export default MenuCart;
