import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SEO from "../../components/seo";
import cogoToast from 'cogo-toast';
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { addToCart, decreaseQuantity, deleteFromCart, deleteAllFromCart } from "../../store/slices/cart-slice";
import { POST_METHOD } from "../../components/Constants/Method"
import React, { useState, useEffect, useCallback } from "react";
import useHttp from '../../components/CustomHook/useApi'
// import { createContext } from "react";

// export const CartContext = createContext();

const Cart = () => {
  // let cartTotalPrice = 0;

  const [quantityCount] = useState(1);
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const [cartDetails,setCartDetails] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  const [total,setTotal] = useState(null)
  const { sendRequest } = useHttp();
  const viewCartItem = () => {
    sendRequest(
      {
        url: POST_METHOD.getCartDetails,
        method: "POST",
        body: { userId:sessionStorage.getItem('userId')}
      },
      (data) => {
        if (data.success) {
          console.log(data);
          // cogoToast.success(data.description, { position: "bottom-left" });
          setCartDetails(data.responseData[0].items)
          setTotal(data.total)
          setIsLoading(true)
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
          setIsLoading(true)
        } else {
          cogoToast.success(data.description, { position: "bottom-left" });
        }
      }
    );
  }

  useEffect(() => {
    viewCartItem();
}, [])

  const clearWholeCart = () => {
    sendRequest(
      {
        url: POST_METHOD.clearWholeCart,
        method: "POST",
        body: { userId:sessionStorage.getItem('userId')}
      },
      (data) => {
        if (data.success) {
          cogoToast.success(data.description, { position: "bottom-left" });
          // viewCartItem() 
          navigate('/shop-grid-filter', { replace: true });
        } else {
          cogoToast.success(data.description, { position: "bottom-left" });
        }
      }
    );
  }

  return (
    <Fragment>
      
      {/* <SEO
        titleTemplate="Cart"
        description="Cart page of flone react minimalist eCommerce template."
      /> */}

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Cart", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />

            {!isLoading && 
                <div className="flone-preloader-wrapper">
                <div className="flone-preloader">
                  <span></span>
                  <span></span>
                </div>
              </div>}

        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {console.log(cartItems)}
            {cartDetails && cartDetails.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Your cart items</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>category</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartDetails.map((cartItem, key) => {
                            
                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                    <img
                                      className="img-fluid"
                                      src={
                                        "https://api.alphabrandsdistribution.com/" + cartItem.productImage
                                      }
                                      alt=""
                                    />
                                </td>

                                <td className="">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.id
                                    }
                                  >
                                    {cartItem.category}
                                  </Link>
                                </td>

                               <td className="product-price-cart">
                               {cartItem.productTitle}
                                </td>

                                <td className="product-quantity">
                                  {cartItem.price}
                                </td>
                                <td>
                                {cartItem.quantity}
                                </td>
                                <td className="product-subtotal">
                                 {Number(cartItem.price) * Number(cartItem.quantity)}
                                </td>

                                <td className="product-remove">
                                  <button
                                    onClick={() => {deleteItemFromCart(cartItem._id);setIsLoading(false);dispatch(deleteFromCart(cartItem._id))}}
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link
                          to={process.env.PUBLIC_URL + "/shop-grid-filter"}
                        >
                          Continue Shopping
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => {dispatch(deleteAllFromCart());clearWholeCart()}}>
                          Clear Shopping Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap d-flex align-items-center justify-content-center">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Cart Total
                        </h4>
                      </div>
                      <h5>
                        Total products{" "}
                        <span>
                          {cartDetails.length}
                        </span>
                      </h5>

                      <h4 className="grand-totall-title">
                        Grand Total{" "}
                        <span>
                          ${total}
                        </span>
                      </h4>
                      <Link to={process.env.PUBLIC_URL + "/checkout"}>
                        Proceed to Checkout
                      </Link>
                    </div>
                  </div>
                </div>
                
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-filter"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Cart;
