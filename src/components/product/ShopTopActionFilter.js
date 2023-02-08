import PropTypes from "prop-types";
import React, { Fragment,useState } from "react";
import Multiselect from 'multiselect-react-dropdown';
import ShopTopFilter from "./ShopTopFilter";
import { toggleShopTopFilter } from "../../helpers/product";
import { Col, Form } from "react-bootstrap";

const ShopTopActionFilter = () => {
  const [selectedItems,setSelectedItems] = useState([])
  const category = [
    {name:'Drinks',label:'Drinks'},
    {name:'Snacks',label:'Snacks'},
    {name:'Food',label:'Food'},
]


  const onSelect = (selectedList, selectedItem)  => {
    console.log(selectedItem);
    let arr = []
    selectedList.map((item) => {
      arr.push(item.name)
    })
    setSelectedItems(arr)
  }
 
  const onRemove = (selectedList, removedItem) => {
    let arr = selectedItems
    arr.map((item,index) => {
      if(item.name === removedItem.name){
        delete arr[index]
      }
    }) 
    setSelectedItems(arr)

  } 
  return (
    <Fragment>
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
        </div>
      </div>

      {/* shop top filter */}
      {/* <ShopTopFilter products={products} getSortParams={getSortParams} /> */}
    </Fragment>
  );
};



export default ShopTopActionFilter;
