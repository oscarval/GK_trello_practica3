import React from "react";
import { connect } from "react-redux";
import "./Main.scss";
import List from "./List/List";
import { DragDropContext } from "react-beautiful-dnd";

const Main = (props) => {
  /* DnD functions */
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)[0];
    const order = result.concat().sort((a, b) => endIndex - startIndex);
    return order;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source)[0];
    const destClone = Array.from(destination);

    let taskToMove = null;
    sourceClone.tasks.map((task, index) => {
      if (index === droppableSource.index) {
        taskToMove = task;
      }
      return task;
    });

    const updateTaskList = destClone.map((list) => {
      return {
        ...list,
        tasks: [...list.tasks, taskToMove],
      };
    });

    return updateTaskList;
  };

  // DnD update store and render components
  const onDragEnd = (result) => {
    props.updateIsmove(true);
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }

    const sInd = source.droppableId;
    const dInd = destination.droppableId;

    if (sInd === dInd) {
      const list = props.state.lists.map((list) =>
        list.id === sInd ? list.tasks : []
      );
      const updatedTasks = reorder(list, source.index, destination.index);
      props.sortTaskList(sInd, updatedTasks);
    } else {
      const listS = props.state.lists.filter((list) => list.id === sInd);
      const listD = props.state.lists.filter((list) => list.id === dInd);
      const result = move(listS, listD, source, destination);

      const reorderResult = reorder(
        [result[0].tasks],
        listD.length,
        destination.index
      );

      props.moveTask(sInd, dInd, draggableId, reorderResult);
    }
  };

  return (
    <div className='Main'>
      <div className='Main-lists'>
        <DragDropContext onDragEnd={onDragEnd}>
          {props.state.lists &&
            props.state.lists.map((list) => {
              return <List key={list.id} title={list.title} idList={list.id} />;
            })}
        </DragDropContext>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ state: state });
const mapDispacthToProps = (dispatch) => ({
  sortTaskList: (idList, updatedTasks) => {
    dispatch({
      type: "SORT_TASKS_LIST",
      payload: {
        idList: idList,
        updatedTasks: updatedTasks,
      },
    });
  },
  updateIsmove: (isMove) => {
    dispatch({
      type: "UPDATE_ISMOVE",
      payload: {
        isMove: isMove,
      },
    });
  },
  moveTask: (oldIdList, newIdList, idTask, updatedTaks) => {
    dispatch({
      type: "MOVE_TASK_LIST",
      payload: {
        oldIdList: oldIdList,
        newIdList: newIdList,
        idTask: idTask,
        updatedTaks: updatedTaks,
      },
    });
  },
});

const connectedMain = connect(mapStateToProps, mapDispacthToProps)(Main);

export default connectedMain;
