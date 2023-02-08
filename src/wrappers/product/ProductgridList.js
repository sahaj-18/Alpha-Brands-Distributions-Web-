import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import ProductGridListSingle from "../../components/product/ProductGridListSingle";
import { POST_METHOD } from "../../components/Constants/Method"
import useHttp from '../../components/CustomHook/useApi'
import Pagination from "../../components/pagination/pagination";
import ShopTopActionFilter from "../../components/product/ShopTopActionFilter";
import Multiselect from 'multiselect-react-dropdown';
import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const ProductGridList = ({
  products,
  spaceBottomClass
}) => {

  const currency = { currencyName: "CAD", currencyRate: 1, currencySymbol: "€" }
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { sendRequest } = useHttp();
  const { compareItems } = useSelector((state) => state.compare);
  const [productList, setProductList] = useState([])
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [notFound,setNotFound] = useState(false)
  const [totalPages, setTotalPages] = useState([]);
  const [isLoading,setIsLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(1)
  const [isApproved,setIsApproved] = useState(null)
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

  const onSelect = (selectedList, selectedItem) => {
    let arr = []
    selectedList.map((item) => {
      arr.push(item.name)
    })
    console.log(arr);
    // setSelectedItems(arr)
    setSearchConfig({
      ...searchConfig,
      category: arr,
    })
  }

  const onRemove = (selectedList, removedItem) => {
    console.log('arr');

    setTimeout(() => {
      
    }, 2000);
    let arr = [...selectedItems]
    console.log(arr);
    arr.map((item, index) => {
      if (item.name === removedItem.name) {
        delete arr[index]
      }
    })
    console.log(arr);
    // setSelectedItems(arr)
    setSearchConfig({
      ...searchConfig,
      category: arr,
    })

  }

  const getProductList = useCallback((searchConfig) => {
    console.log(searchConfig);
    sendRequest({
      url: POST_METHOD.productSearchSortList,
      method: 'POST',
      body: {
        userId:sessionStorage.getItem('userId'),
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
        setTotalCount(data.count)
        let totalPage = Math.ceil(data.count / numberOfRecord)
        setTotalPages(Array(totalPage).fill((x, i) => i).map((x, i) => i + 1));
      } else {
        if (data.code === 102){
          setNotFound(true)
          setSearchConfig({
            ...searchConfig,
            category:[]
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
  }, [getProductList])

  return (
    <Fragment>
      {notFound && 
      <>
      <div className="shop-top-bar mb-35">
      <div className="select-shoing-wrap">
        <div className="shop-select">
          <Multiselect
            options={category} // Options to display in the dropdown
            selectedValues='' // Preselected value to persist in dropdown
            onSelect={onSelect} // Function will trigger on select event
            onRemove={onRemove} // Function will trigger on remove event
            displayValue="name" // Property name to display in the dropdown options
            placeholder="Categories "
          />
        </div>
        <Button type="submit" style={{backgroundColor:"#a749ff",border:"1px solid #a749ff",width:"100px",height:"40px"}} onClick={getProductList.bind(null, searchConfig)}>Search</Button>              
      </div>
    </div>


      <div className="error-area pt-40 pb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-8 text-center">
                <div className="error">
                  <h1 style={{fontSize:'50px'}}>Oops!</h1>
                  <h4 style={{marginBottom:"30px"}}>
                    Your Search Is Not Found In List
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
        } 

              {!isLoading && 
                <div className="flone-preloader-wrapper">
                <div className="flone-preloader">
                  <span></span>
                  <span></span>
                </div>
              </div>}
      {(isApproved && isLoading ) &&
      <div className="shop-top-bar mb-35">
        <div className="select-shoing-wrap">
          <div className="shop-select">
            <Multiselect
              options={category} // Options to display in the dropdown
              selectedValues='' // Preselected value to persist in dropdown
              onSelect={onSelect} // Function will trigger on select event
              onRemove={onRemove} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
              placeholder="Categories "
            />
          </div>
          <Button type="submit" style={{backgroundColor:"#a749ff",border:"1px solid #a749ff",width:"100px",height:"40px"}} onClick={getProductList.bind(null, searchConfig)}>Search</Button>              
        </div>
      </div>
  }
      {(isApproved && isLoading && !notFound) && 
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
      {(!isApproved && isLoading && !notFound)&& <>
        <div className="error-area pt-40 pb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-8 text-center">
                <div className="error">
                  <h1 style={{fontSize:'50px'}}>Oops!</h1>
                  <h4 style={{marginBottom:"30px"}}>
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
