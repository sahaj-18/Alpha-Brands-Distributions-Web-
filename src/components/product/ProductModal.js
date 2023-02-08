import { Fragment } from "react";
import PropTypes from "prop-types";
import { EffectFade, Thumbs } from 'swiper';
import { Modal } from "react-bootstrap";
import cogoToast from 'cogo-toast';
import { useDispatch, useSelector } from "react-redux";
import Swiper, { SwiperSlide } from "../../components/swiper";
import { getProductCartQuantity } from "../../helpers/product";
import { addToCart } from "../../store/slices/cart-slice";
import { POST_METHOD } from "../Constants/Method"
import React, { useState, useEffect, useCallback } from "react";
import useHttp from '../CustomHook/useApi'
import { createContext } from "react";
import { useCart } from "react-use-cart";


export const CartContext = createContext();


function ProductModal({ product, currency, discountedPrice, finalProductPrice, finalDiscountedPrice, show, onHide, wishlistItem, compareItem }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variation ? product.variation[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variation ? product.variation[0].size[0].name : ""
  );
  const [productStock, setProductStock] = useState(
    product.variation ? product.variation[0].size[0].stock : product.stock
  );
  const [quantityCount, setQuantityCount] = useState(1);
  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );

  const { sendRequest } = useHttp();

  const gallerySwiperParams = {
    spaceBetween: 10,
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    thumbs: { swiper: thumbsSwiper },
    modules: [EffectFade, Thumbs],
  };

  const thumbnailSwiperParams = {
    onSwiper: setThumbsSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: true
  };

  const onCloseModal = () => {
    setThumbsSwiper(null)
    onHide()
  }
  const { addItem } = useCart();
  const { totalItems } = useCart();

  console.log(cartItems)

  const addToCartItem = () => {
    sendRequest(
      {
        url: POST_METHOD.addToCart,
        method: "POST",
        body: { productId:product._id,userId:sessionStorage.getItem('userId'),quantity:quantityCount }
      },
      (data) => {
        if (data.success) {
          cogoToast.success(data.description, { position: "bottom-left" });
          addItem(product, quantityCount);
        } else {
          cogoToast.success(data.description, { position: "bottom-left" });
        }
      }
    );
  }

  const editCartItem = (details) => {
    sendRequest(
      {
        url: POST_METHOD.editToCart,
        method: "POST",
        body: { productId:details._id,userId:sessionStorage.getItem('userId'),quantity:quantityCount }
      },
      (data) => {
        if (data.success) {
          cogoToast.success(data.description, { position: "bottom-left" });
        } else {
          cogoToast.success(data.description, { position: "bottom-left" });
        }
      }
    );
  }
  return (
    <CartContext.Provider value={product}>
    <Modal show={show} onHide={onCloseModal} className="product-quickview-modal-wrapper">
    <Modal.Header closeButton></Modal.Header>

    <div className="modal-body">
      <div className="row">
        <div className="col-md-5 col-sm-12 col-xs-12">
          <div className="product-large-image-wrapper">
            <Swiper options={gallerySwiperParams}>
            <div className="single-image">
                        <img
                          src={"https://api.alphabrandsdistribution.com/" + product.productImage}
                          className="img-fluid"
                          alt="Product"
                        />
                      </div>
            </Swiper>
          </div>
        </div>
        <div className="col-md-7 col-sm-12 col-xs-12">
          <div className="product-details-content quickview-content">
            <h2>{product.productTitle}</h2>
            <div className="product-details-price">
                <Fragment>
                  
                  <span>$ {sessionStorage.getItem('type') == 1 ? product.priceForRetailer : product.priceForwholesaler}</span>
                
                </Fragment>
              
            </div>
            <div className="pro-details-list">
              <p>{product.productDescription}</p>
            </div>
              <div className="pro-details-quality">
                <div className="cart-plus-minus">
                  <button
                    onClick={() =>{
                      setQuantityCount(
                        quantityCount > 1 ? quantityCount - 1 : 1
                      )}
                    }
                    className="dec qtybutton"
                  >
                    -
                  </button>
                  <input
                    className="cart-plus-minus-box"
                    type="text"
                    value={quantityCount}
                    readOnly
                  />
                  <button
                    onClick={() =>
                      setQuantityCount(
                        quantityCount >= 1
                          ? quantityCount + 1
                          : quantityCount
                      )
                    }
                    className="inc qtybutton"
                  >
                    +
                  </button>
                </div>
               
               
                  {!cartItems.some(ele => ele._id === product._id) && 
                  <div className="pro-details-cart btn-hover">
                    <button
                    onHide={onCloseModal}
                      onClick={() => {addToCartItem();setThumbsSwiper(null);
                        onHide();dispatch(addToCart({
                        ...product,
                        quantity: quantityCount
                      }))}}
                      // disabled={cartItems.some(ele => ele._id === product._id)}
                    >
                      {" "}
                      Add To Cart{" "}
                    </button>
                </div>
               }
                {cartItems.some(ele => ele._id === product._id) && 
                <div className="pro-details-cart btn-hover">
                    <button
                      onClick={() => {editCartItem(product);setThumbsSwiper(null);
                        onHide()}}
                      // disabled={productCartQty >= productStock}
                    >
                      {" "}
                     Edit Item In Cart{" "}
                    </button>
                </div>
                }
              </div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
  </CartContext.Provider>
  );
}

ProductModal.propTypes = {
  currency: PropTypes.shape({}),
  discountedprice: PropTypes.number,
  finaldiscountedprice: PropTypes.number,
  finalproductprice: PropTypes.number,
  onHide: PropTypes.func,
  product: PropTypes.shape({}),
  show: PropTypes.bool,
  wishlistItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({})
};

export default ProductModal;
