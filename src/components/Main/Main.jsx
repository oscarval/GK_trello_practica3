import React from "react";
import { connect } from "react-redux";
import "./Main.scss";
import ItemList from "./Item-list/Item-list";

const Main = (props) => {
  return (
    <div className='Main'>
      <div className='Main-lists'>
        <div className='Main-list'>
          <div className='Main-list-title'>Title</div>
          <div className='Main-list-items'>
            <ItemList />
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
