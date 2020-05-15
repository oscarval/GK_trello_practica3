import React from "react";
import { connect } from "react-redux";
import "./Navbar.scss";

const Navbar = (props) => {
  const addList = () => {
    props.addList(Date.now());
  };

  return (
    <div className='Navbar'>
      <div className='Navbar-title'>GeeksHubs Trello</div>
      <div className='Navbar-actions'>
        <div className='button' onClick={addList}>
          Add list
        </div>
      </div>
    </div>
  );
};

const mapDispacthToProps = (dispatch) => ({
  addList: (idList) => {
    console.log("New list wiht id: ", idList);
    // dispatch({
    //   type: "ADD_LIST",
    //   payload: Date.now(),
    // });
  },
});

const connectedNavbar = connect(null, mapDispacthToProps)(Navbar);

export default connectedNavbar;
