import React from 'react';

const EditableInput = (props) => {
  const toggleEdit = props.toggleEditable.bind(null, props.editVariable)
  return(
    <div className='editable-input'>
      {!props.editable &&
      <h2 onClick={toggleEdit}>
        {props.displayValue}
      </h2>}
      {props.editable &&
      <input
        autoFocus
        value={props.displayValue}
        onChange={props.handleChange}
        onBlur={toggleEdit}
      />}
    </div>
  )
}

export default EditableInput;