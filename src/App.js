import { Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


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

const App = () => {
  return (
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
  );
};

export default App;