import React from 'react';
import PropTypes from 'prop-types';

const HealthTracker = (props) => {
  return (
    <div className='health-tracker'>
      <button onClick={props.handleUpdateCreature.bind(null, 'creatureHealth', props.creatureHealth-1, props.index)}>-</button>
      <button onClick={props.handleUpdateCreature.bind(null, 'creatureHealth', props.creatureHealth+1, props.index)}>+</button>
    </div>
  )
}

HealthTracker.propTypes = {
  creatureHealth: PropTypes.number.isRequired,
  handleUpdateCreature: PropTypes.func.isRequired
}

export default HealthTracker;