import React from 'react';

const ConditionTracker = (props) => {
  return (
    <ul className='condition-tracker'>
      {props.conditions.map((cond) => {
        return (
          <li 
            key={cond.name}
            onClick={props.handleUpdateConditions.bind(null, cond.name, props.index)}
            style={
              {
                color: props.activeConditions.includes(cond.name) ? 'red' : 'black'
              }
            }
            title={
              cond.desc.reduce((prevVal, currVal) => {
                return prevVal + '\n' + currVal
              }, '')
            }>
              {cond.name}
            </li>
        )
      })}
    </ul>
  )
}

export default ConditionTracker;