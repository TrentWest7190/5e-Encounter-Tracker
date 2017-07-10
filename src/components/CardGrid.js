import React from 'react';
import PropTypes from 'prop-types';
import CreatureCard from '../containers/CreatureCard';

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
            handleUpdateCreature={props.handleUpdateCreature}
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