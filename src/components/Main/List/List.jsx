import React, { useRef } from "react";
import { connect } from "react-redux";
import "./List.scss";
import ItemList from "../Item-list/Item-list";

const List = (props) => {
  const listItems = props.state.lists.find((list) => list.id === props.idList);
  const refListItems = useRef();

  const addTask = () => {
    props.addTask(listItems.id, Date.now());
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log("dragenter", e);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log("handleDragLeave", e);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log("handleDragOver", e);
    e.dataTransfer.dropEffect = "move";
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = JSON.parse(e.dataTransfer.getData("object"));
    //const dom = document.getElementById(data.idTask);
    //refListItems.current.appendChild(dom);
    props.moveTask(data.oldIdList, props.idList, data.idTask);
  };

  return (
    <div
      className='List'
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDrop={(e) => handleDrop(e)}>
      <div className='List-title'>{props.title}</div>
      <div ref={refListItems} className='List-items'>
        {listItems.tasks.map((task) => {
          return (
            <ItemList
              key={task.id}
              idList={listItems.id}
              idTask={task.id}
              text={task.text}
            />
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
  moveTask: (oldIdList, newIdList, idTask) => {
    dispatch({
      type: "MOVE_TASK_LIST",
      payload: {
        oldIdList: oldIdList,
        newIdList: newIdList,
        idTask: idTask,
      },
    });
  },
});

const connectedList = connect(mapStateToProps, mapDispacthToProps)(List);

export default connectedList;
