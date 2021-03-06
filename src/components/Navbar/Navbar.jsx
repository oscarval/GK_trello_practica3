import React from "react";
import { connect } from "react-redux";
import "./Navbar.scss";
import logo from "../../assets/img/logo.png";

const Navbar = (props) => {
  const addList = () => {
    const title = prompt("Please enter your list name (min length 3).", "");
    if (title) {
      props.addList("List-" + Date.now(), title);
    }
  };

  return (
    <div className='Navbar'>
      <div className='Navbar-logo'>
        <img src={logo} alt='GeeksHubs practice 3' />
      </div>
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
  addList: (idList, title) => {
    dispatch({
      type: "ADD_LIST",
      payload: {
        id: idList,
        title: title,
        tasks: [],
      },
    });
  },
});

const connectedNavbar = connect(null, mapDispacthToProps)(Navbar);

export default connectedNavbar;
