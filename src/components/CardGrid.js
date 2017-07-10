import React, { Component } from 'react';
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
      <button onClick={props.handleUpdateCreature.bind(null, 'creatureHealth', props.creatureHealth-1, props.index)}>-</button>
      <button onClick={props.handleUpdateCreature.bind(null, 'creatureHealth', props.creatureHealth+1, props.index)}>+</button>
    </div>
  )
}

HealthTracker.propTypes = {
  creatureHealth: PropTypes.number.isRequired,
  handleUpdateCreature: PropTypes.func.isRequired
}

class CreatureCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      editName: props.creature.creatureName
    }

    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.handleUpdateName = this.handleUpdateName.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  toggleEditMode() {
    this.setState((prevState) => {
      return {
        editable: !prevState.editable
      }
    })
  }

  handleUpdateName(event) {
    const updateTo = event.target.value;
    this.setState(() => {
      return {
        editName: updateTo
      }
    })
    this.props.handleUpdateCreature('creatureName', updateTo, this.props.index);
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.setState((prevState) => {
        return {
          editable: !prevState.editable
        }
      })
    }
  }

  render() {
    return (
      <div className='creature-card'>
        {!this.state.editable && 
        <h2 onClick={this.toggleEditMode}>{this.props.creature.creatureName}</h2>}
        {this.state.editable &&
        <input
          className='name-input'
          onChange={this.handleUpdateName}
          onKeyPress={this.handleKeyPress}
          onBlur={this.toggleEditMode}
          value={this.state.editName}
        />}
        <HealthTracker 
          creatureHealth={this.props.creature.creatureHealth}
          handleUpdateCreature={this.props.handleUpdateCreature}
          index={this.props.index}
        />
        <ConditionTracker
          conditions={this.props.conditions}
          activeConditions={this.props.creature.activeConditions}
          handleUpdateConditions={this.props.handleUpdateConditions}
          index={this.props.index}
        />
        <div 
          className='close-card'
          onClick={this.props.handleRemoveCreature.bind(null, this.props.index)}>
            X
        </div>
      </div>
    )
  }

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