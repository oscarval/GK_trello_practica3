import React from "react";
import { connect } from "react-redux";
import "./List.scss";
import ItemList from "../Item-list/Item-list";

const List = (props) => {
  const listItems = props.state.lists.find((list) => list.id === props.idList);

  const addTask = () => {
    props.addTask(listItems.id, Date.now());
  };

  return (
    <div className='List'>
      <div className='List-title'>{props.title}</div>
      <div className='List-items'>
        {listItems.tasks.map((task) => {
          return (
            <ItemList key={task.id} idList={listItems.id} idTask={task.id} />
          );
        })}
      </div>
      <div className='List-footer'>
        <div className='List-add-item' onClick={addTask}>
          +Add a task
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ state: state });
const mapDispacthToProps = (dispatch) => ({
  addTask: (idList, idTask) => {
    dispatch({
      type: "ADD_TASK",
      payload: {
        idList: idList,
        idTask: idTask,
      },
    });
  },
});

const connectedList = connect(mapStateToProps, mapDispacthToProps)(List);

export default connectedList;
