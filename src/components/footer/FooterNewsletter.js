import PropTypes from "prop-types";
import clsx from "clsx";
import SubscribeEmail from "./sub-components/SubscribeEmail";

const FooterNewsletter = ({
  spaceBottomClass,
  spaceLeftClass,
  sideMenu,
  colorClass,
  widgetColorClass
}) => {
  return (
    <div className={clsx("footer-widget", spaceBottomClass, sideMenu ? "ml-ntv5" : spaceLeftClass, widgetColorClass)}>
      <div className="footer-title">
        <h3>Contact Us</h3>
      </div>
      <div className={clsx("subscribe-style", colorClass)}>
        <p> <a href = "mailto: alphadistributionyyc@gmail.com"><b>alphadistributionyyc@gmail.com</b></a></p>
        {/* subscribe email */}
        {/* <SubscribeEmail mailchimpUrl="#!" /> */}
      </div>
    </div>
  );
};

FooterNewsletter.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  colorClass: PropTypes.string,
  widgetColorClass: PropTypes.string
};

export default FooterNewsletter;
