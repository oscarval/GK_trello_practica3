import React from "react";
import { connect } from "react-redux";
import "./Main.scss";

const Main = (props) => {
  return (
    <div className='Main'>
      <div className='Main-lists'>
        <div className='Main-list'>
          <div className='Main-list-title'>Title</div>
          <div className='Main-list-items'>
            <div
              draggable='true'
              className='item'
              key='item-1111'
              id='item-1111'>
              <textarea className='item-textarea'></textarea>
            </div>
            <div className='item' key='item-2222' id='item-2222'>
              <textarea className='item-textarea'></textarea>
            </div>
            <div className='item' key='item-3333' id='item-3333'>
              <textarea className='item-textarea'></textarea>
            </div>
            <div className='item' key='item-4444' id='item-44444'>
              <textarea className='item-textarea'></textarea>
            </div>
          </div>
          <div className='Main-list-footer'>
            <div className='Main-list-add-item'>+Add Item</div>
          </div>
        </div>
        <div className='Main-list'> Lista 2</div>
        <div className='Main-list'> Lista 3</div>
        <div className='Main-list'> Lista 4</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ state: state });
const mapDispacthToProps = (dispatch) => ({});

const connectedNavbar = connect(mapStateToProps, mapDispacthToProps)(Main);

export default connectedNavbar;
