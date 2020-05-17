import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import "./Item-list.scss";

const ItemList = (props) => {
  const refItemTextarea = useRef();
  const refItemText = useRef();

  const [values, setValues] = useState({
    task: "texto1",
  });

  const finishEdit = (e) => {
    refItemTextarea.current.classList.add("hide");
    refItemText.current.classList.add("show");
    refItemText.current.innerHTML = values.task;
  };

  const editItem = (e) => {
    refItemText.current.classList.remove("show");
    refItemText.current.classList.add("hide");
    refItemTextarea.current.classList.remove("hide");
    refItemTextarea.current.focus();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className='Item-list' id={props.itemId}>
      <div ref={refItemText} className='Item-text' onClick={editItem}></div>
      <textarea
        ref={refItemTextarea}
        className='Item-textarea'
        name='task'
        value={values.task}
        onChange={handleChange}
        onBlur={finishEdit}></textarea>
    </div>
  );
};

const mapStateToProps = (state) => ({ state: state });
const mapDispacthToProps = (dispatch) => ({});

const connectedItemList = connect(
  mapStateToProps,
  mapDispacthToProps
)(ItemList);

export default connectedItemList;
