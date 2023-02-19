import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom"; 
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const NotFound = () => {
  let { pathname } = useLocation();

  return (
    <Fragment>
      {/* <SEO
        titleTemplate="Not Found"
        description="404 of flone react minimalist eCommerce template."
      /> */}
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Thank you", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />
        <div className="error-area pt-40 pb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-8 text-center">
                <div className="error">
                  <h1 style={{fontSize:'50px'}}>Thank You</h1>
                  <h4 style={{marginBottom:"30px"}}>
                    Thank you for being our valued customer.We are so grateful for the pleasure of serving you and hope we met your expections.
                  </h4>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-filter"} className="error-btn">
                    Back to home page
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default NotFound;
