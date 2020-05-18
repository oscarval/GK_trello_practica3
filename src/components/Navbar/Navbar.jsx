import React from "react";
import { connect } from "react-redux";
import "./Navbar.scss";

const Navbar = (props) => {
  const addList = () => {
    const title = prompt("Please enter your list name (min length 3).", "");
    if (title) {
      props.addList(Date.now(), title);
    }
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
