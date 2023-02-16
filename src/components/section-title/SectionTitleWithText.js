import PropTypes from "prop-types";
import clsx from "clsx";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("welcome-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="welcome-content text-center">
          <h1>Welcome To Alpha Brands Distribution</h1>
          <p className="mb-2">Alpha Brands Distribution is an online marketplace that offers a wide range of exotic
          drinks, chocolates, and chips. We provide our customers with high-quality
          products, competitive prices, and exceptional customer service.</p>

          <p className="mb-2">Our team consists of experts in particular field, who are passionate about to dig very
          rare and unique snacks and committed to helping our customers find exactly what
          they're looking for. With a vast selection of products and a user-friendly
          website, Alpha Brands Distribution makes it easy for you to find and purchase the products you need.</p>

          <p className="mb-2">At Alpha Brands, we believe that shopping should be simple, convenient, and
          enjoyable. That's why we offer a variety of payment options, fast and
          affordable shipping. Our goal is to provide you with an exceptional shopping
          experience, every time you visit our site.</p>

          <p className="mb-2">We take pride in our commitment to providing top-quality products and exceptional
          customer service. If you have any questions or concerns, please don't hesitate
          to contact us. Our friendly and knowledgeable customer service team is always
          here to help.</p>

          <p className="mb-2">Thank you for choosing Alpha Brands Distribution! We look forward to serving you.</p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SectionTitleWithText;
