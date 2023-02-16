import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

const Privacy = () => {
    let { pathname } = useLocation();
    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className="text-center mb-5">
                            <strong>Privacy Policy for Alpha Brands Distribution</strong>
                        </h1>
                        <b>Introduction:</b>
                        <p>At Alpha Brands we take the privacy of our customers seriously. This privacy policy outlines the types of personal information we collect, how we use it, and the steps we take to protect it. Our goal is to provide you with a safe and secure online shopping experience.</p>
                        <b>Information Collection:</b>
                        <p>We collect personal information from our customers when they create an account, place an order, or sign up for our newsletter. This information may include name, address, email address, telephone number, and payment information.</p>
                        <b>Use of Personal Information:</b>
                        <p>The personal information we collect is used to process orders, provide customer service, and improve the overall shopping experience. We may also use this information to send promotional emails or targeted advertising.</p>
                        <b>Information Sharing:</b>
                        <p>We do not sell or share your personal information with third-party companies except as necessary to process your order (e.g., with a shipping carrier).</p>
                        <b>Security:</b>
                        <p>We take steps to protect your personal information from unauthorized access, use, or disclosure. This includes implementing technical, administrative, and physical security measures.</p>
                        <b>Cookies:</b>
                        <p>We use cookies to remember your preferences and enhance your shopping experience. You can disable cookies in your web browser, but this may affect your ability to use certain features of our website.</p>
                        <b>Opt-Out:</b>
                        <p>You may opt-out of receiving promotional emails or targeted advertising by clicking the unsubscribe link in the email or contacting us directly.</p>
                        <b>Changes to Privacy Policy:</b>
                        <p>We reserve the right to modify this privacy policy at any time. If we make changes, we will update the policy on our website and notify you via email or other means.</p>
                        <b>Contact Information:</b>

                        <p>If you have any questions or concerns about our privacy policy, please contact us at <b>alphadistributionyyc@gmail.com</b></p>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default Privacy;