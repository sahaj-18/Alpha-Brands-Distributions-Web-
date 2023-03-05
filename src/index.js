import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from "./App";
import { store } from "./store/store";
import PersistProvider from "./store/providers/persist-provider";
import { setProducts } from "./store/slices/product-slice"
import products from "./data/products.json";
import 'animate.css';
import 'swiper/swiper-bundle.min.css';
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "./assets/scss/style.scss";
import "./i18n";
import { CartProvider } from "react-use-cart";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_51McibOLu6kryVLFNNAgLmzUtUFiS1q4OIDeOOlLikxYK24uK14tHgOnr6uTVOZNFrR5008FF1ASOiO7WZMU2Ti7B00imyDI9sm');

store.dispatch(setProducts(products));

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
      <PersistProvider>
        <CartProvider>
        <Elements stripe={stripePromise}>
        <App />
        </Elements>
        </CartProvider>
      </PersistProvider>
    </Provider>
);

