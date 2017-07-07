import React, { Component } from 'react';
import PropTypes from 'prop-types';

const HealthTracker = (props) => {
  return (
    <div className='health-tracker'>
      <h3>{props.creatureHealth}</h3>
      <button onClick={props.handleClick.bind(null, -1)}>-</button>
      <button onClick={props.handleClick.bind(null, 1)}>+</button>
    </div>
  )
}

HealthTracker.propTypes = {
  creatureHealth: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired
}

class CreatureCard extends Component {
  constructor(props) {
    super(props);
    this.handleUpdateHealth = this.handleUpdateHealth.bind(this);
  }

  handleUpdateHealth(updateBy) {
    this.props.onUpdateHealth(updateBy, this.props.index);
  }

  render() {
    return (
      <div className='creature-card'>
        <h2>{this.props.creature.creatureName}</h2>
        <HealthTracker 
          creatureHealth={this.props.creature.creatureHealth}
          handleClick={this.handleUpdateHealth}
        />
        <div 
          className='close-card'
          onClick={this.props.onRemoveCreature.bind(null, this.props.index)}>
          X
        </div>
      </div>
    )
  }
}

const CardGrid = (props) => {
  return (
    <div className='card-grid'>
      {props.creatures.map((creature, index) => {
        return (
          <CreatureCard 
            key={index} 
            creature={creature}
            index={index}
            onRemoveCreature={props.onRemoveCreature}
            onUpdateHealth={props.onUpdateHealth}
          />
        )
      })}
    </div>
  )
}

export default CardGrid;