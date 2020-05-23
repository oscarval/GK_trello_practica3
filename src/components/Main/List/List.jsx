import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./List.scss";
import ItemList from "../Item-list/Item-list";
import deleteIcon from "../../../assets/img/delete.png";
import { Droppable, Draggable } from "react-beautiful-dnd";

const List = (props) => {
  const listItems = props.state.lists.find((list) => list.id === props.idList);

  const addTask = () => {
    props.addTask(listItems.id, "Item-" + Date.now());
  };

  const deleteList = (e) => {
    const result = window.confirm("Are you sure to delete list?");
    if (result) {
      props.deleteList(props.idList);
    }
  };

  useEffect(() => {
    // console.log("render!");
  });

  return (
    <div className='List' id={props.idList}>
      <div className='List-header'>
        <div className='List-title'> {props.title}</div>
        <div className='List-delete' onClick={deleteList}>
          <img src={deleteIcon} alt='delete' />
        </div>
      </div>
      <Droppable droppableId={props.idList}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {listItems.tasks &&
              listItems.tasks.map((task, index) => (
                <Draggable draggableId={task.id} key={index} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>
                      <ItemList
                        index={index}
                        idList={listItems.id}
                        idTask={task.id}
                        text={task.text}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
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
  deleteList: (idList) => {
    dispatch({
      type: "DELETE_LIST",
      payload: {
        idList: idList,
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
  refreshIdItemDrag: () => {
    dispatch({
      type: "REFRESH_ITEM_DRAG",
    });
  },
});

const connectedList = connect(mapStateToProps, mapDispacthToProps)(List);

export default connectedList;
