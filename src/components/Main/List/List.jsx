import React, { useRef } from "react";
import { connect } from "react-redux";
import "./List.scss";
import ItemList from "../Item-list/Item-list";
import deleteIcon from "../../../assets/img/delete.png";
import Sortable from 'sortablejs';

const List = (props) => {
  const listItems = props.state.lists.find((list) => list.id === props.idList);
  const refListItems = useRef();
  const refShadow = useRef();

  const addTask = () => {
    props.addTask(listItems.id, Date.now());
  };

  const deleteList = (e) => {
    const result = window.confirm("Are you sure to delete list?");
    if (result) {
      props.deleteList(props.idList);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      // props.idList !== props.state.idListDrag &&
      e.target.className.indexOf("Item-list") === -1
      // &&
      // e.target.className.indexOf("Item-text") === -1 &&
      // e.target.className.indexOf("shadow") === -1
    ) {
      // console.log("leave", e.target);
      //refShadow.current.classList.add("hide");
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    // if (props.idList !== props.state.idListDrag) {
    if (
      e.target.className.indexOf("Item-text") !== -1 &&
      e.target.className.indexOf("shadow") === -1
    ) {
      try {
        refShadow.current.classList.remove("hide");
        // if (
        //   e.target.className.indexOf("Item-text") !== -1
        //   // ||
        //   // e.target.className.indexOf("shadow") !== -1
        // ) {
        if (isBefore(refShadow.current, e.target.parentNode)) {
          e.target.parentNode.parentNode.insertBefore(
            refShadow.current,
            e.target.parentNode
          );
        } else {
          e.target.parentNode.parentNode.insertBefore(
            refShadow.current,
            e.target.parentNode
          );
        }
        // }
      } catch (e) {
        // nothing
      }
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    document
      .querySelectorAll(".shadow")
      .forEach((el) => el.classList.add("hide"));
    props.updateIdItemDrag(null, null);
    props.moveTask(
      props.state.idListDrag,
      props.idList,
      props.state.idItemDrag
    );
  };

  const isBefore = (el1, el2) => {
    if (el2.parentNode === el1.parentNode)
      for (
        var cur = el1.previousSibling;
        cur && cur.nodeType !== 9;
        cur = cur.previousSibling
      )
        if (cur === el2) return true;
    return false;
  };

  return (
    <div
      className='List'
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDrop={(e) => handleDrop(e)}
      id={props.idList}>
      <div className='List-header'>
        <div className='List-title'> {props.title}</div>
        <div className='List-delete' onClick={deleteList}>
          <img src={deleteIcon} alt='delete' />
        </div>
      </div>
      <div
        ref={refListItems}
        className='List-items'
        onDragOver={(e) => handleDragOver(e)}>
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
        <div
          ref={refShadow}
          className='Item-list shadow hide'
          id='Item-list-1'></div>
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
});

const connectedList = connect(mapStateToProps, mapDispacthToProps)(List);

export default connectedList;
