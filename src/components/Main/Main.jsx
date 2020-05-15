import React from "react";
import { connect } from "react-redux";
import "./Main.scss";

const Main = (props) => {
  return (
    <div className='Main'>
      <div className='Main-lists'>
        <div className='Main-list'> Lista 1</div>
        <div className='Main-list'> Lista 1</div>
        <div className='Main-list'> Lista 1</div>
        <div className='Main-list'> Lista 1</div>
        <div className='Main-list'> Lista 1</div>
        <div className='Main-list'> Lista 1</div>
        <div className='Main-list'> Lista 1</div>
        <div className='Main-list'> Lista 1</div>
        <div className='Main-list'> Lista 1</div>
        <div className='Main-list'> Lista 1</div>
        <div className='Main-list'> Lista 1</div>
        <div className='Main-list'> Lista 1</div>
        <div className='Main-list'> Lista 1</div>
        <div className='Main-list'> Lista 1</div>
        <div className='Main-list'> Lista 1</div>
        <div className='Main-list'> Lista 1</div>
        <div className='Main-list'> Lista 1</div>
        <div className='Main-list'> Lista 1</div>
        <div className='Main-list'> Lista 1</div>
        <div className='Main-list'> Lista 1</div>
        <div className='Main-list'> Lista 1</div>
        <div className='Main-list'> Lista 1</div>
        <div className='Main-list'> Lista 1</div>
        <div className='Main-list'> Lista 1</div>
        <div className='Main-list'> Lista 1</div>
        <div className='Main-list'> Lista 1</div>
        <div className='Main-list'> Lista 1</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ state: state });
const mapDispacthToProps = (dispatch) => ({});

const connectedNavbar = connect(mapStateToProps, mapDispacthToProps)(Main);

export default connectedNavbar;
