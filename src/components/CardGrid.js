import React from 'react';
import PropTypes from 'prop-types';

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

const HealthTracker = (props) => {
  return (
    <div className='health-tracker'>
      <h3>{props.creatureHealth}</h3>
      <button onClick={props.handleUpdateHealth.bind(null, -1, props.index)}>-</button>
      <button onClick={props.handleUpdateHealth.bind(null, 1, props.index)}>+</button>
    </div>
  )
}

HealthTracker.propTypes = {
  creatureHealth: PropTypes.number.isRequired,
  handleUpdateHealth: PropTypes.func.isRequired
}

const CreatureCard = (props) => {
  return (
    <div className='creature-card'>
      <h2>{props.creature.creatureName}</h2>
      <HealthTracker 
        creatureHealth={props.creature.creatureHealth}
        handleUpdateHealth={props.handleUpdateHealth}
        index={props.index}
      />
      <ConditionTracker
        conditions={props.conditions}
        activeConditions={props.creature.activeConditions}
        handleUpdateConditions={props.handleUpdateConditions}
        index={props.index}
      />
      <div 
        className='close-card'
        onClick={props.handleRemoveCreature.bind(null, props.index)}>
          X
      </div>
    </div>
  )
}

CreatureCard.propTypes = {
  creature: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleRemoveCreature: PropTypes.func.isRequired,
  handleUpdateHealth: PropTypes.func.isRequired
}

const CardGrid = (props) => {
  return (
    <div className='card-grid'>
      {props.creatures.map((creature, index) => {
        return (
          <CreatureCard 
            key={index} 
            creature={creature}
            conditions={props.conditions}
            index={index}
            handleRemoveCreature={props.handleRemoveCreature}
            handleUpdateHealth={props.handleUpdateHealth}
            handleUpdateConditions={props.handleUpdateConditions}
          />
        )
      })}
    </div>
  )
}

CardGrid.propTypes = {
  creatures: PropTypes.array.isRequired,
  handleRemoveCreature: PropTypes.func.isRequired,
  handleUpdateHealth: PropTypes.func.isRequired
}

export default CardGrid;