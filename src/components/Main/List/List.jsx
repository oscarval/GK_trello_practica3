import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import "./List.scss";
import ItemList from "../Item-list/Item-list";
import deleteIcon from "../../../assets/img/delete.png";
import Sortable from "sortablejs/modular/sortable.complete.esm.js";

const List = (props) => {
  const listItems = props.state.lists.find((list) => list.id === props.idList);
  const refListItems = useRef();

  const addTask = () => {
    props.addTask(listItems.id, Date.now());
  };

  const deleteList = (e) => {
    const result = window.confirm("Are you sure to delete list?");
    if (result) {
      props.deleteList(props.idList);
    }
  };

  /* Drag and rop functions */
  useEffect(() => {
    console.log("render! idlist", props.state.idListDrag);
    Sortable.create(refListItems.current, {
      group: {
        name: "List-items-" + props.idList,
        pull: true,
        put: true,
        draggable: ".Item-list",
      },
      onChoose: function (e) {
        updateDrag(+e.target.querySelectorAll(".Item-list")[e.oldIndex].id);
      },
      onAdd: (e) => {
        props.refreshIdItemDrag();
        moveTask();
      },
      animation: 100,
    });
  });

  const updateDrag = (idItemList) => {
    props.updateIdItemDrag(idItemList, +props.idList);
  };

  const moveTask = (idItemList) => {
    props.moveTask(
      props.state.idListDrag,
      props.idList,
      props.state.idItemDrag
    );
  };

  return (
    <div className='List' id={props.idList}>
      <div className='List-header'>
        <div className='List-title'> {props.title}</div>
        <div className='List-delete' onClick={deleteList}>
          <img src={deleteIcon} alt='delete' />
        </div>
      </div>
      <div ref={refListItems} className='List-items'>
        {listItems.tasks.map((task) => {
          if (task && task.id) {
            return (
              <ItemList
                key={task.id}
                idList={listItems.id}
                idTask={task.id}
                text={task.text}
              />
            );
          }
          return "";
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
  updateIdItemDrag: (idTask, idList) => {
    dispatch({
      type: "UPDATE_ITEM_DRAG",
      payload: {
        idTask: idTask,
        idList: idList,
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
