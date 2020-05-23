import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import "./Item-list.scss";
import deleteIcon from "../../../assets/img/delete.png";

const ItemList = (props) => {
  const refItemTextarea = useRef();
  const refItemText = useRef();
  const refContent = useRef();
  const refDelete = useRef();

  const [values, setValues] = useState({
    task: props.text ? props.text : "",
  });

  const finishEdit = (e) => {
    if (refItemTextarea.current) {
      refItemTextarea.current.classList.add("hide");
      refItemText.current.classList.add("show");
      refDelete.current.classList.remove("hide");
      refItemText.current.innerHTML = values.task;
      props.updateTask(props.idList, props.idTask, values.task);
    }
  };

  const editItem = (e) => {
    if (refItemTextarea.current) {
      refItemText.current.classList.remove("show");
      refItemText.current.classList.add("hide");
      refDelete.current.classList.add("hide");
      refItemTextarea.current.classList.remove("hide");
      refItemTextarea.current.focus();
    }
  };

  const deleteTask = (e) => {
    props.deleteTask(props.idTask, props.idList);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value.replace(/\r?\n/gi, "") });
    if (event.which === 13) {
      finishEdit();
    }
  };

  useEffect(() => {
    console.log("render",props.text);
    if (props.text && props.state.isMove) {
      refItemTextarea.current.classList.add("hide");
      refItemText.current.classList.add("show");
      refDelete.current.classList.remove("hide");
      refItemText.current.innerHTML = props.text;
      props.updateIsmove(false);
    }
  });

  return (
    <div ref={refContent} className='Item-list' id={props.idTask}>
      <div ref={refDelete} className='Item-delete' onClick={deleteTask}>
        <img src={deleteIcon} alt='delete' />
      </div>
      <div
        ref={refItemText}
        className='Item-text'
        onDoubleClick={editItem}></div>
      <textarea
        ref={refItemTextarea}
        className='Item-textarea'
        name='task'
        value={values.task}
        placeholder='Enter any text for this task'
        onChange={handleChange}
        onBlur={finishEdit}></textarea>
    </div>
  );
};

const mapStateToProps = (state) => ({ state: state });
const mapDispacthToProps = (dispatch) => ({
  updateTask: (idList, idTask, text) => {
    dispatch({
      type: "UPDATE_TASK",
      payload: {
        idList: idList,
        idTask: idTask,
        text: text,
      },
    });
  },
  deleteTask: (idTask, idList) => {
    dispatch({
      type: "DELETE_TASK",
      payload: {
        idTask: idTask,
        idList: idList,
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
});

const connectedItemList = connect(
  mapStateToProps,
  mapDispacthToProps
)(ItemList);

export default connectedItemList;
