import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductGridListSingle from "../../components/product/ProductGridListSingle";
import { POST_METHOD } from "../../components/Constants/Method"
import useHttp from '../../components/CustomHook/useApi'
import Pagination from "../../components/pagination/pagination";
import ShopTopActionFilter from "../../components/product/ShopTopActionFilter";
import Multiselect from 'multiselect-react-dropdown';
import MultiSelect from 'react-multiple-select-dropdown-lite'
import cogoToast from 'cogo-toast';
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const options = [
  { label: 'Drinks', value: 'Drinks' },
  { label: 'Chips', value: 'Chips' },
  { label: 'Chocolates', value: 'Chocolates' },
  { label: 'Candy/Gummies', value: 'Candy/Gummies' }
]

const ProductGridList = ({
  products,
  spaceBottomClass
}) => {

  const currency = { currencyName: "CAD", currencyRate: 1, currencySymbol: "€" }
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { sendRequest } = useHttp();
  const { compareItems } = useSelector((state) => state.compare);
  const [productList, setProductList] = useState([])
  const [removeItems, setRemoveItesm] = useState([])
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [notFound, setNotFound] = useState(false)
  const [totalPages, setTotalPages] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(1)
  const [isApproved, setIsApproved] = useState(false)
  const [value, setvalue] = useState([])
  const [optionSelected, setOptionSelected] = useState(null)
  const [myState,setMyState] = useState([])
  let numberOfRecord = 8;
  const [searchConfig, setSearchConfig] = useState({
    searchField: 'productTitle',
    category: [],
    searchValue: ''
  })
  const [selectedItems, setSelectedItems] = useState([])
  const category = [
    { name: 'Drinks', label: 'Drinks' },
    { name: 'Chips', label: 'Chips' },
    { name: 'Chocolates', label: 'Chocolates' },
    { name: 'Candy/Gummies', label: 'Candy/Gummies' }
  ]

 

  const handleOnchange = val => {
    val = val.split(",")
   if(val[0] !== 'Drinks' && val[0] !== 'Chips' && val[0] !== 'Chocolates' && val[0] !== 'Candy/Gummies') {
      setSearchConfig({
        ...searchConfig,
        category: []
      })
      setOptionSelected(null)
      setMyState([])
    } 
    else {
      setSearchConfig({
        ...searchConfig,
        category: val
      })
      setOptionSelected(val)
      setMyState(val)
    }


  }

  const getProductList = useCallback((searchConfig) => {
    if(localStorage.getItem('NotFound') === 'true'){
        localStorage.setItem('NotFound',false)
      // navigate('/shop-grid-filter', { replace: true });
      window.location.reload();
  }
    setIsLoading(false)
    sendRequest({
      url: POST_METHOD.productSearchSortList,
      method: 'POST',
      body: {
        userId: sessionStorage.getItem('userId'),
        page: currentPage,
        numberOfRecord: numberOfRecord,
        ...searchConfig
      },

    }, (data) => {
      if (data.success) {
        setProductList(data.responseData)
        setNotFound(false)
        setIsApproved(true)
        setIsLoading(true)
        localStorage.setItem('NotFound',false)
        setTotalCount(data.count)
        let totalPage = Math.ceil(data.count / numberOfRecord)
        setTotalPages(Array(totalPage).fill((x, i) => i).map((x, i) => i + 1));
        cogoToast.success(data.description, { position: "top-right" });
      } else {
        cogoToast.error(data.description, { position: "top-right" });
        setIsLoading(true)
        if (data.code === 102) {
          setNotFound(true)
          localStorage.setItem('NotFound',true)
          setIsLoading(true)
          setSearchConfig({
            ...searchConfig,
            category: []
          })
        }
        setProductList([])
        setTotalPages([])
        setIsApproved(false)
      }

    });
  }, [sendRequest, currentPage, numberOfRecord])

  // const search = () => {
  //   console.log(searchConfig);
  //   sendRequest({
  //     url: POST_METHOD.productSearchSortList,
  //     method: 'POST',
  //     body: {
  //       page: currentPage,
  //       numberOfRecord: numberOfRecord,
  //       ...searchConfig
  //     },

  //   }, (data) => {
  //     if (data.success) {
  //       setProductList(data.responseData)
  //       // console.log(data.responseData.length);
  //       setTotalCount(data.count)
  //       let totalPage = Math.ceil(data.count / numberOfRecord)
  //       setTotalPages(Array(totalPage).fill((x, i) => i).map((x, i) => i + 1));
  //     } else {
  //       setProductList([])
  //       setTotalPages([])
  //     }

  //   });
  // }



  useEffect(() => {
    getProductList();
  }, [getProductList,sendRequest])


  const onChangeSearchConfig = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSearchConfig({
        ...searchConfig,
        [name]: value,
    })
}

  return (
    <Fragment>
      {!isLoading &&
        <div className="flone-preloader-wrapper">
          <div className="flone-preloader">
            <span></span>
            <span></span>
          </div>
        </div>
        
        }

        <div className="container-xxl">
          <div className="row mb-5">
            <div className="col-md-4 col-lg-4 col-xl-4">
              <div className="row mb-3">
                <div className="col-md-6 col-lg-6 col-xl-6 mb-3">
                  <select name="searchField" type="select" style={{ height: "46px", borderRadius: '10px' }} onChange={onChangeSearchConfig}>
                    <option value="productTitle">Name</option>
                  </select>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6">
                  <input
                    name="searchValue"
                    placeholder="Search Here"
                    type="text"
                    value={searchConfig.searchValue}
                    onChange={onChangeSearchConfig}
                    style={{ height: "46px", borderRadius: '10px', backgroundColor: 'white',border:'1px solid #eceff8' }}
                  />
                </div>

              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6">
              <div className="row mb-3">
                <div className="col-md-6 col-lg-6 col-xl-6">
                  <MultiSelect
                    onChange={handleOnchange}
                    options={options}
                    placeholder="Select Category"
                    value={optionSelected}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2">
              <div className="d-grid gap-2">
                <Button type="submit" style={{ backgroundColor: "#a749ff", border: "1px solid #a749ff", width: "100px", height: "40px" }} onClick={getProductList.bind(null, searchConfig)}>Search</Button>
              </div>
            </div>
          </div>
        </div>
       
      {(notFound) &&
        <>
          <div className="error-area pt-40 pb-100">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-7 col-lg-8 text-center">
                  <div className="error">
                    <h1 style={{ fontSize: '50px' }}>Oops!</h1>
                    <h4 style={{ marginBottom: "30px" }}>
                      Your Search Is Not Found In List
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </> 
}
        { (isApproved && isLoading) &&
         <>
         {productList?.map(product => {
           return (
             <div className="col-xl-4 col-sm-6" key={product.id}>
               <ProductGridListSingle
                 spaceBottomClass="mb-25"
                 product={product}
                 currency={currency}
                 cartItem={
                   cartItems.find(cartItem => cartItem.id === product.id)
                 }
               />
             </div>
           )
         })}
       </>
      }
      {/* {(isApproved && isLoading) &&


        <div className="container-xxl">
          <div className="row mb-5">
            <div className="col-md-4 col-lg-4 col-xl-4">
              <div className="row mb-3">
                <div className="col-md-6 col-lg-6 col-xl-6 mb-3">
                  <select name="searchField" type="select" style={{ height: "46px", borderRadius: '10px' }} onChange={onChangeSearchConfig}>
                    <option value="productTitle">Name</option>
                   
                  </select>
                </div>

                <div className="col-md-6 col-lg-6 col-xl-6">
                  <input
                    name="searchValue"
                    placeholder="Search Here"
                    type="text"
                    value={searchConfig.searchValue}
                    onChange={onChangeSearchConfig}
                    style={{ height: "46px", borderRadius: '10px', backgroundColor: 'white',border:'1px solid #eceff8' }}
                  />
                </div>

              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6">
              <div className="row mb-3">
                <div className="col-md-6 col-lg-6 col-xl-6">
                  <MultiSelect
                    onChange={handleOnchange}
                    options={options}
                    placeholder="Select Category"
                    value={optionSelected}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2">
              <div className="d-grid gap-2">
                <Button type="submit" style={{ backgroundColor: "#a749ff", border: "1px solid #a749ff", width: "100px", height: "40px" }} onClick={getProductList.bind(null, searchConfig)}>Search</Button>
              </div>
            </div>
          </div>
        </div>
      } */}
      {/* {(isApproved && isLoading && !notFound) &&
       
      } */}
      
      {(!isApproved && isLoading && !notFound) && 
      <>
        <div className="error-area pt-40 pb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-8 text-center">
                <div className="error">
                  <h1 style={{ fontSize: '50px' }}>Oops!</h1>
                  <h4 style={{ marginBottom: "30px" }}>
                    you are not approved by admin so please try again later.
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>}
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={numberOfRecord}
        onPageChange={page => setCurrentPage(page)} />
    </Fragment>
  );
};

ProductGridList.propTypes = {
  products: PropTypes.array,
  spaceBottomClass: PropTypes.string,
};

export default ProductGridList;
