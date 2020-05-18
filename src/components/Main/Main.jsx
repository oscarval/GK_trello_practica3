import React from "react";
import { connect } from "react-redux";
import "./Main.scss";
import List from "./List/List";

const Main = (props) => {
  return (
    <div className='Main'>
      <div className='Main-lists'>
        {props.state.lists.map((list) => {
          return <List key={list.id} title={list.title} idList={list.id}/>;
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ state: state });
const mapDispacthToProps = (dispatch) => ({});

const connectedMain = connect(mapStateToProps, mapDispacthToProps)(Main);

export default connectedMain;
