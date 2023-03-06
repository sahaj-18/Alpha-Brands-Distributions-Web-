import { Fragment,useRef  } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import Alert from 'react-bootstrap/Alert';
import { getDiscountPrice } from "../../helpers/product";
import { Button } from "react-bootstrap";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Modal from "react-bootstrap/Modal";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import cogoToast from 'cogo-toast';
import React, { useState, useEffect, useCallback } from "react";
import useHttp from '../../components/CustomHook/useApi'
import { POST_METHOD } from "../../components/Constants/Method"
import { addToCart, decreaseQuantity, deleteFromCart, deleteAllFromCart } from "../../store/slices/cart-slice";
import GooglePayButton from '@google-pay/button-react'
import { initialState } from "react-use-cart";
let clientSecret = 'sk_test_51McibOLu6kryVLFNz5u9xGMfKSF63IFBdEhxHv2WqeSOSK6fFQRs4OVZpEtMk2QHkNtLGYHsFfPxtgPVqZHsbrJE00hOOT347g'



const Checkout = () => {

  const stripe = useStripe();


  let cartTotalPrice = 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const elements = useElements();
  const [gPayBtn, setGPayBtn] = useState(null);
  const [finaltotal,setIsFinalTotal] = useState(0)
  const [isModal, setIsModal] = useState(false)
  const [addresSubmited,setAddresSubmited] = useState(false)
  let { pathname } = useLocation();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const [isDisable, setIsDisable] = useState(true)
  const [cartDetails, setCartDetails] = useState([])
  const [total, setTotal] = useState()
  const [isLoading,setIsLoading] = useState(false)
  const [cartAdd,setCartAdd] = useState(false)
  const { sendRequest } = useHttp();
  const [isFormSubmitted, setIsFormSubmitted] = useState(true);
  const [userDetails, setUserDetails] = useState({
    address: ''
  });
  const [updateUerDetails, setUpdateUserDetals] = useState({})
  const [userCredentials, setUserCredentials] = useState({
    userId: sessionStorage.getItem('userId'),
    jwtToken: sessionStorage.getItem('Jwt Token'),
  })
  const [cardList, setCardList] = useState([])

  const getUserDetails = () => {
    sendRequest(
      {
        url: POST_METHOD.getUserDetails,
        method: "POST",
        body: { userId: sessionStorage.getItem('userId') }
      },
      (data) => {
        console.log(data);
        if (data.success) {
          setUserDetails({address : data.responseData.address})
          if(data.responseData.address === ''){
            setAddresSubmited(true)
          }
        } else {
          // cogoToast.success(data.description, { position: "bottom-left" });
        }
      }
    );
  }

  const getCardListForUser = () => {
    sendRequest(
      {
        url: POST_METHOD.getCardListForUser,
        method: "POST",
        body: { userId: sessionStorage.getItem('userId') }
      },
      (data) => {
        console.log(data);
        if (data.success) {
          setCardList(data.responseData)
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
          setIsLoading(true)
        } else {
          // cogoToast.success(data.description, { position: "bottom-left" });
          // setIsLoading(true)
        }
      }
    );
  }

  const onSelectCard = (event) => {
    const value = event.target.value
    sendRequest({
      url: POST_METHOD.selectCard,
      method: 'POST',
      body: { ...userCredentials, cardId: value},
      showErrorToast: true,
      showSuccessToast: true,
      isShowLoading: true,
      isHideLoading: true
    }, (data) => {
      if (data.success) {
        // setCardId(event.target.value)
        // detCardDetail(data.responseData)
      } else {
        // detCardDetail({})
      }

    });
  }

  useEffect(() => {
    viewCartItem();
    getUserDetails();
    getCardListForUser()
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

  const onAddCard = async (event) => {
    
    event.preventDefault();
   
    if (!stripe || !elements) {
      return;
    }
    const token = await stripe.createToken(elements.getElement(CardElement));
    if(token.token){
      setIsLoading(false)
   }
    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    
    
    
    const cardData = {
      ...userCredentials,
      paymentMethod: payload.paymentMethod.id,
      card: token.card,
      token: token.token,
    };

    sendRequest({
      url: POST_METHOD.addCard,
      method: 'POST',
      body: cardData,
      showErrorToast: true,
      showSuccessToast: true,
      isShowLoading: true,
      isHideLoading: true
    }, (data) => {
      if (data.success) {
        getCardListForUser()
        setIsLoading(true)
        setCartAdd(true)
      } else {
        setCardList([])
      }

    });
    // setIsModal(false)

  };

  const onSubmit = () => {
    setIsLoading(false)
    sendRequest({
      url: POST_METHOD.generatePaymentIntent,
      method: 'POST',
      body: {
        ...userCredentials,
        amount:total
      },
      isShowLoading: true,
      isHideLoading: true
    }, (data) => {
      if (data.success) {
        setIsLoading(true)
        setIsModal(true)
        setCartAdd(false)
        addHistory()
        navigate('/thankyou', { replace: true });
      } else {
        setCardList([])
      }

    });
  }

const getAddress = (event) => {
      let value = event.target.value;
      let name = event.target.name;
      setUserDetails({
        [name]: value
      })

}

  const updateuser = () => {
    sendRequest(
      {
        url: POST_METHOD.userUpdate,
        method: "POST",
        body: {
          userId: sessionStorage.getItem('userId'), 
          jwtToken:sessionStorage.getItem('Jwt Token'),
          address:userDetails.address
        },
        isFormData:false
      },
      (data) => {
        if (data.success) {
          cogoToast.success(data.description, { position: "top-right" });
          getUserDetails()
          setAddresSubmited(false)
        } else {
          cogoToast.error(data.description, { position: "top-right" });
        }
      }
    );
  }



  return (
    <Fragment>
      <LayoutOne headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Checkout", path: process.env.PUBLIC_URL + pathname }
          ]}
        />

{!isLoading && 
                <div className="flone-preloader-wrapper">
                <div className="flone-preloader">
                  <span></span>
                  <span></span>
                </div>
              </div>}

        {!addresSubmited}
        <div className="checkout-area pt-95 pb-100">
          <div className="container">


            {}
            {cartDetails && cartDetails.length >= 1 ? (
              <div className="row">
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

                        <div className="your-order-total">
                          <textarea style={{backgroundColor:"white"}} name="address" placeholder="Enter Your Delivery Address" value={userDetails.address} onChange={getAddress}></textarea>
                          <div>
                          <Button type="submit" style={{ backgroundColor: "#a749ff", border: "1px solid #a749ff"}} onClick={updateuser}>Add Address</Button>
                          </div>
                        </div>

                      </div>
                      <div className="payment-method"></div>
                    </div>
                    {console.log(finaltotal)}
                    <div className="mt-3">
            <Button type="submit" style={{ backgroundColor: "#a749ff", border: "1px solid #a749ff"}} onClick={() => { setIsModal(true) }} disabled={addresSubmited}>Pay</Button>
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


        <Modal show={isModal} onHide={() => { setIsModal(false) }}>
        <Modal.Header closeButton>
          <Modal.Title>Card details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            {!cartAdd ? 
          <form onSubmit={onAddCard}>
            <label className="row ">
              <CardElement />
            </label>
            
            <Button
            style={{ backgroundColor: "#a749ff", border: "1px solid #a749ff"}} 
              className=" mt-3 btn float-end"
              type="submit"
              disabled={!stripe}
            >
              Add
            </Button>
          </form>
          :
          <>
           <Alert variant="success">
           Card Is successFully Added Now you can pay with this card
        </Alert>
          
          </>
          }
          <div className="row" style={{marginTop:"120px"}}>
          <ul className="list-unstyled list-group list-group-custom list-group-flush mb-0">
          {
            cardList.map((data, index) => (
              <li className="list-group-item px-md-4 py-3" key={index}>
                <div className="row ">
                  <div className="col-10 form-check">
                    <input className="form-check-input" name='card' type="radio" defaultChecked={data.isDefault} value={data._id} onChange={onSelectCard} />
                    <label className="form-check-label" htmlFor={data.symbol}>

                      XXXX-XXXX-XXXX-{data.lastFour} <span>{data.cardType}</span>

                    </label>
                  </div>
                </div>
              </li>
            ))
          }
          {cardList.length > 0 ?  <div className="col mt-4">
                   <Button type="submit" className="float-end" style={{ backgroundColor: "#a749ff", border: "1px solid #a749ff"}} onClick={() => { onSubmit() }}>Pay</Button>
                  </div> : <>
                  </>}
          
          </ul>
          </div>
        </Modal.Body>
        {!isLoading && 
                <div className="flone-preloader-wrapper">
                <div className="flone-preloader">
                  <span></span>
                  <span></span>
                </div>
              </div>}
      </Modal>
      

      </LayoutOne>
    </Fragment>
  );
};

export default Checkout;
