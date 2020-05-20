import React, { useRef } from "react";
import { connect } from "react-redux";
import "./List.scss";
import ItemList from "../Item-list/Item-list";

const List = (props) => {
  const listItems = props.state.lists.find((list) => list.id === props.idList);
  const refListItems = useRef();
  const refShadow = useRef();

  const addTask = () => {
    props.addTask(listItems.id, Date.now());
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    //const domShadow = document.getElementById(`#${props.idList}-1`);
    //console.log(domShadow);
    // console.log("dragenter", e);
    // if (e.target.className.indexOf("Item-list") !== -1) {
    //   // const originDom = document.getElementById("" + props.state.idItemDrag);
    //   let originDom = document.createElement('div');
    //   originDom.className = "shadow";
    //   if (isBefore(originDom, e.target)) {
    //     e.target.parentNode.insertBefore(originDom, e.target);
    //   } else {
    //     e.target.parentNode.insertBefore(originDom, e.target.nextSibling);
    //   }
    // }
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

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (props.idList !== props.state.idListDrag) {
      refShadow.current.classList.add("hide");
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    if (props.idList !== props.state.idListDrag) {
      refShadow.current.classList.remove("hide");
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    refShadow.current.classList.add("hide");
    props.updateIdItemDrag(null, null);
    props.moveTask(
      props.state.idListDrag,
      props.idList,
      props.state.idItemDrag
    );
  };

  return (
    <div
      className='List'
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDrop={(e) => handleDrop(e)}
      id={props.idList}>
      <div className='List-title'>{props.title}</div>
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
