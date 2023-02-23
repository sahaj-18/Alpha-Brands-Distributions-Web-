import { Suspense, lazy } from "react";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useHttp from './components/CustomHook/useApi'
import { POST_METHOD } from "./components/Constants/Method"
import { deleteAllFromCart,addToCart } from "./store/slices/cart-slice";

let JwtToken = sessionStorage.getItem('Jwt Token');

// shop pages

const ShopGridFilter = lazy(() => import("./pages/shop/ShopGridFilter"));

// other pages
const About = lazy(() => import("./pages/other/About"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));
const ForgotPassword = lazy(() => import("./pages/other/ForgotPassword"))
const VerificationOfOtp = lazy(() => import("./pages/other/VerificationOfOtp"))
const SetNewPassword = lazy(() => import("./pages/other/SetNewPassword"))
const Cart = lazy(() => import("./pages/other/Cart"));
const Checkout = lazy(() => import("./pages/other/Checkout"));
const Privacy = lazy(() => import("./pages/other/Privacy"))
const Terms = lazy(() => import("./pages/other/Terms"));
const NotFound = lazy(() => import("./pages/other/NotFound"));
const Searchbar = lazy(() => import("./wrappers/product/searchBar"))
const AboutForWeb = lazy(() => import("./pages/other/AboutForWeb"))

const App = () => {
  const dispatch = useDispatch();
  const { sendRequest } = useHttp();
  const [cartDetails,setCartDetails] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  const viewCartItem = () => {
    sendRequest(
      {
        url: POST_METHOD.getCartDetails,
        method: "POST",
        body: { userId:sessionStorage.getItem('userId')}
      },
      (data) => {
        if (data.success) {
          console.log('data',data.responseData[0].items);
          dispatch(deleteAllFromCart())
          (data.responseData[0].items.map((item) => {
            dispatch(addToCart({
              ...item,
              quantity: item.quantity

            }))
          }))
          setIsLoading(true)
          // if(data.responseData[0].items.length == 0){
            // dispatch(addToCart({
            //   ...data.responseData[0].items
            // }))
          // }
          // cogoToast.success(data.description, { position: "top-right" });
          // setCartDetails(data.responseData[0].items)
        } else {
          if(data.code == 102){
            dispatch(deleteAllFromCart())
            setIsLoading(true)
          }
        }
      }
    );
  }

  useEffect(() => {
    viewCartItem();
}, [])

  return (
    <>
    {/* {console.log(isLoading)}
    {!isLoading && 
      <div className="flone-preloader-wrapper">
      <div className="flone-preloader">
        <span></span>
        <span></span>
      </div>
    </div>
  } */}


      <Router>
        <ScrollToTop>
          <Suspense
            fallback={
              <div className="flone-preloader-wrapper">
                <div className="flone-preloader">
                  <span></span>
                  <span></span>
                </div>
              </div>
            }
          >
            <Routes>
              {(JwtToken !== undefined && JwtToken !== null && JwtToken !== '' && JwtToken) ?
              <>
              <Route
                path={process.env.PUBLIC_URL + "/"}
                element={<ShopGridFilter/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/shop-grid-filter"}
                element={<ShopGridFilter/>}
              />
            
              {/* Other pages */}
             
              <Route
                path={process.env.PUBLIC_URL + "/searchbar"}
                element={<Searchbar/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/my-account"}
                element={<MyAccount/>}
              />
                <Route
                path={process.env.PUBLIC_URL + "/cart"}
                element={<Cart/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/checkout"}
                element={<Checkout/>}
              /> 
              <Route
                path={process.env.PUBLIC_URL + "/thankyou"}
                element={<NotFound/>}
              /> 
              <Route
                path={process.env.PUBLIC_URL + "/about"}
                element={<About/>}
              />
               <Route
                path={process.env.PUBLIC_URL + "/privacy"}
                element={<Privacy/>}
              /> 
              <Route
                path={process.env.PUBLIC_URL + "/terms"}
                element={<Terms/>}
              /> 
             
              <Route path="*" element={<ShopGridFilter/>} />
              </>
              :
              <>
              <Route
                path={process.env.PUBLIC_URL + "/"}
                element={<LoginRegister/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/login-register"}
                element={<LoginRegister/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/ForgotPassword"}
                element={<ForgotPassword/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/VerificationOfOtp"}
                element={<VerificationOfOtp/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/SetNewPassword"}
                element={<SetNewPassword/>}
              />
               <Route
                path={process.env.PUBLIC_URL + "/about"}
                element={<About/>}
              />
               <Route
                path={process.env.PUBLIC_URL + "/privacy"}
                element={<Privacy/>}
              /> 
              <Route
                path={process.env.PUBLIC_URL + "/terms"}
                element={<Terms/>}
              /> 
              <Route path="*" element={<LoginRegister/>} />
              </>
}
          
            </Routes>
            
          </Suspense>
        </ScrollToTop>
      </Router>
      </>
  );
};

export default App;