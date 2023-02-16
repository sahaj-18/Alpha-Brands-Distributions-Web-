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
                            <strong>Terms And Condition of Alpha Brands Distribution</strong>
                        </h1>
                        <b>Introduction</b>
                        <p>Welcome to Alpha Brands Distribution an online marketplace for rare drinks, exotic chips,
                        and unique chocolates. By using our website, you agree to be bound by the
                        following terms and conditions, as well as any additional terms to which you
                        may agree in writing. If you do not agree to these terms and conditions, please
                        do not use our website.</p>
                        <b>Eligibility</b>
                        <p>To use our website and make purchases, you must be at least 8 years old and have
                        the capacity to enter into a legally binding agreement.</p>
                        <b>Product Information</b>
                        <p>All product descriptions, prices, and specifications provided on our website are
                        subject to change without notice. We make every effort to accurately display
                        our products, but we cannot guarantee that the colors or other details
                        displayed on your screen will match the actual product.</p>
                        <b>Order Processing</b>
                        <p>When you place an order through our website, you agree to pay the price for the
                        product(s) as well as any applicable taxes and shipping fees. We accept various
                        payment methods such as interact, card. All orders are subject to availability
                        and acceptance by Alpha Brands Distribution.</p>
                        <b>Returns and Refunds</b>
                        <p>We take pride in the quality of our products and want our customers to be
                        completely satisfied with their purchases. However, we understand that there
                        may be circumstances where a return or refund is not possible. Therefore, we
                        have a strict no-refund policy.
                        Once a purchase is made, it cannot be canceled or refunded. All sales are final. We do not offer refunds, returns, or exchanges for any reason, including but not limited to:
                        <ul style={{listStyleType:"disc",marginInlineStart:"17px"}}>
                        <li>Change of mind</li>
                        <li>Incorrect product selection</li>
                        <li>Product no longer needed</li>
                        <li>Defective product not caused by shipping damage</li>
                        </ul>
                        In the unlikely event that you receive a damaged or defective product, please contact our customer service team within 24 hours of delivery to report the issue. We may ask you to provide photos of the damaged product.</p>
                        <b>User Content</b>
                        <p>You may submit reviews, comments, and other content to our website, but you grant Alpha
                        Brands Distribution the right to use, copy, distribute, and display such
                        content in any manner. You are solely responsible for any content you submit,
                        and you represent and warrant that it does not infringe on the intellectual
                        property rights of any third party.</p>
                        <b>Intellectual Property</b>
                        <p>Alpha Brands Distribution owns or has the right to use all intellectual property
                        rights in and to the website and its products, including trademarks,
                        copyrights, and patents. You may not use such intellectual property for any
                        purpose without the prior written consent of the company.</p>
                        <b>Disclaimer of Warranties</b>
                        <p>THE WEBSITE AND ITS PRODUCTS ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY
                        KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY WARRANTY OF
                        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                        Alpha Brands Distribution DOES NOT WARRANT THAT THE WEBSITE WILL BE UNINTERRUPTED OR
                        ERROR-FREE AND WILL NOT BE LIABLE FOR ANY DAMAGES ARISING FROM THE USE OF THE
                        WEBSITE OR ITS PRODUCTS.</p>
                        <b>Limitation of Liability</b>
                        <p>ALPHA BRANDS DISTRIBUTION'S LIABILITY TO YOU FOR ANY DAMAGES ARISING FROM THE USE OF THE WEBSITE OR
                        ITS PRODUCTS WILL BE LIMITED TO THE AMOUNT PAID BY YOU FOR SUCH PRODUCTS.</p>
                        <b>Dispute Resolution</b>
                        <p>Any dispute arising from or related to these terms and conditions, or the use of
                        our website will be resolved through binding arbitration in accordance with the
                        applicable arbitration rules.</p>
                        <b>Changes to the Terms</b>
                        <p>Alpha Brands Distribution reserves the right to make changes to these terms and conditions at any time
                        and will provide notice of such changes by posting the revised terms on our
                        website. Your continued use of the website constitutes acceptance of any
                        changes to these terms and conditions.</p>
                        <b>Governing Law</b>
                        <p>These terms and conditions will be governed by and construed in accordance with the
                        laws of the Calgary, Alberta, Canada.</p>
                    </div>
                    </div>
                </div>
           

        </Fragment>
    )
}

export default Privacy;