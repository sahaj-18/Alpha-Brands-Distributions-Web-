import { Fragment,useRef  } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import cogoToast from 'cogo-toast';
import React, { useState, useEffect, useCallback } from "react";
import useHttp from '../../components/CustomHook/useApi'
import { POST_METHOD } from "../../components/Constants/Method"
import { addToCart, decreaseQuantity, deleteFromCart, deleteAllFromCart } from "../../store/slices/cart-slice";
import GooglePayButton from '@google-pay/button-react'
import { initialState } from "react-use-cart";



const Checkout = () => {
  let cartTotalPrice = 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [gPayBtn, setGPayBtn] = useState(null);
  const [finaltotal,setIsFinalTotal] = useState(0)
  const [addresSubmited,setAddresSubmited] = useState(false)
  let { pathname } = useLocation();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const [cartDetails, setCartDetails] = useState([])
  const [total, setTotal] = useState()

  const { sendRequest } = useHttp();
  const [isFormSubmitted, setIsFormSubmitted] = useState(true);
  const [userDetails, setUserDetails] = useState({
    address: ''
  });
  const [updateUerDetails, setUpdateUserDetals] = useState({})


  const getUserDetails = () => {
    console.log("ADADGW");
    sendRequest(
      {
        url: POST_METHOD.getUserDetails,
        method: "POST",
        body: { userId: sessionStorage.getItem('userId') }
      },
      (data) => {
        console.log(data);
        if (data.success) {
          setUserDetails(data.responseData)
        } else {
          // cogoToast.success(data.description, { position: "bottom-left" });
        }
      }
    );
  }

  const viewCartItem = () => {
    sendRequest(
      {
        url: POST_METHOD.getCartDetails,
        method: "POST",
        body: { userId: sessionStorage.getItem('userId') }
      },
      (data) => {
        if (data.success) {
          // cogoToast.success(data.description, { position: "bottom-left" });
          setCartDetails(data.responseData[0].items)
          setTotal(data.total)
          let total = (data.total).toString()
          setIsFinalTotal(total)
        } else {
          // cogoToast.success(data.description, { position: "bottom-left" });
        }
      }
    );
  }
  useEffect(() => {
    viewCartItem();
    getUserDetails();
  }, [])

  const addHistory = () => {
    sendRequest(
      {
        url: POST_METHOD.addHistory,
        method: "POST",
        body: { userId: sessionStorage.getItem('userId') }
      },
      (data) => {
        if (data.success) {
          dispatch(deleteAllFromCart())
          // cogoToast.success(data.description, { position: "bottom-left" });
          // setCartDetails(data.responseData[0].items)
          // setTotal(data.total)
        } else {
          // cogoToast.success(data.description, { position: "bottom-left" });
        }
      }
    );
  }

  const updateuser = (data) => {
    sendRequest(
      {
        url: POST_METHOD.userUpdate,
        method: "POST",
        body: {
          userId: sessionStorage.getItem('userId'), 
          jwtToken:sessionStorage.getItem('Jwt Token'),
          address:data
        },
        isFormData:false
      },
      (data) => {
        if (data.success) {
          // cogoToast.success(data.description, { position: "bottom-left" });
          // getUserDetails()
          // setAddresSubmited(true)
        } else {
          // cogoToast.error(data.description, { position: "bottom-left" });
        }
      }
    );
  }

  // const addAddress = () => {
  //   // setUserDetails({
  //   //   ...userDetails,
  //   //   address:reference.current.value
  //   // })
  //   // setIsFormSubmitted(true);
  //   let isFormValid ;
  //   // Object.keys(validation).map((data) => {
  //   //   if (isFormValid) {
  //   //     isFormValid = validation[data];
  //   //   }
  //   //   return data;
  //   // });
  //   // if(reference.current.value.length > 6){
  //   //   console.log('***aaaa');
  //   //   isFormValid = true
  //   //   setIsFormSubmitted(true)
  //   // }else{
  //   //   cogoToast.error("Address Is Required", { position: "bottom-left" });

  //   // }

  //   // console.log(isFormValid);
  //   if (isFormValid) {
      
   
  // }
  // }
  

  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="Checkout page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Checkout", path: process.env.PUBLIC_URL + pathname }
          ]}
        />
        {!addresSubmited}
        <div className="checkout-area pt-95 pb-100">
          <div className="container">


            {}
            {cartDetails && cartDetails.length >= 1 ? (
              <div className="row">
                {/* <div className="col-lg-7"> */}
                  {/* <div className="billing-info-wrap"> */}
                    {/* <h3>Billing Details</h3> */}
                    {/* <div className="row"> */}
                    {/* </div> */}

                    {/* <div className="additional-info-wrap"> */}
                      {/* <div className="additional-info"> */}
                        {/* <label>Your Address</label> */}
                        {/* <textarea
                          placeholder="Enter Your Address ..."
                          name="address"
                          value={userDetails.address}
                          disabled={isDisable}
                        /> */}

                        {/* <div className="your-order-area">
                          <div className="place-order mt-25">
                            <button className="btn-hover">Add Address</button>
                          </div>
                        </div> */}
                      {/* </div> */}
                    {/* </div> */}



                  {/* </div> */}
                {/* </div> */}




                
          
                <div className="col-lg-8">
                  <div className="your-order-area">
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartDetails.map((cartItem, key) => {
                              return (
                                <li key={key}>
                                  <span className="order-middle-left" style={{fontSize:"17px"}}>
                                    {cartItem.productTitle} X <b>{cartItem.quantity}</b>
                                  </span>{" "}
                                  <span className="order-price" style={{fontSize:"17px"}}>
                                    $ {Number(cartItem.price) * (cartItem.quantity)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total" style={{fontSize:"17px"}}>Total</li>
                            <li style={{fontSize:"17px"}}>
                              $ {total}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    {console.log(finaltotal)}
                    <div className="mt-3">
                    <GooglePayButton
                      environment="TEST"
                      paymentRequest={{
                        apiVersion: 2,
                        apiVersionMinor: 0,
                        allowedPaymentMethods: [
                          {
                            type: 'CARD',
                            parameters: {
                              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                              allowedCardNetworks: ['MASTERCARD', 'VISA', 'AMEX', 'INTERAC', 'DISCOVER'],
                              billingAddressRequired: true,
                              billingAddressParameters: {
                                format: "FULL",
                                phoneNumberRequired: true
                              }
                            },
                            tokenizationSpecification: {
                              type: 'PAYMENT_GATEWAY',
                              parameters: {
                                gateway: 'example',
                                gatewayMerchantId: 'exampleGatewayMerchantId',
                              },
                            },
                          },
                        ],
                        merchantInfo: {
                          merchantId: '12345678901234567890',
                          merchantName: 'Demo Merchant',
                        },
                        transactionInfo: {
                          totalPriceStatus: 'FINAL',
                          totalPriceLabel: 'Total',
                          totalPrice: finaltotal,
                          currencyCode: 'USD',
                          countryCode: 'US',
                        },
                        // shippingAddressPa
                        callbackIntents: ['PAYMENT_AUTHORIZATION']
                      }}
                      onLoadPaymentData={paymentRequest => {
                        console.log('load payment data', paymentRequest);
                        // navigate('/shop-grid-filter', { replace: true });
                      }}
                      onPaymentAuthorized={paymentData => {
                        updateuser(paymentData.paymentMethodData.info.billingAddress.address1)
                        console.log(paymentData);
                        navigate('/thankyou', { replace: true });
                        addHistory()
                        return { transactionState: 'SUCCESS' }
                      }}
                      existingPaymentMethodRequired='false'
                      buttonColor="default"
                      buttonType="Buy"
                    />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
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

export default Checkout;
