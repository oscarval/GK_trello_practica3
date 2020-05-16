import React from "react";
import "./Item-list.scss";

const ItemList = (props) => {
  return (
    <div className='item' id={props.itemId}>
      <textarea className='item-textarea'></textarea>
    </div>
  );
};

export default ItemList;
