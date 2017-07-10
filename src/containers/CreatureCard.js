import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ConditionTracker from '../components/ConditionTracker';
import EditableInput from '../components/EditableInput';
import HealthTracker from '../components/HealthTracker';

class CreatureCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editableName: false,
      editableHealth: false
    }

    this.toggleEditable = this.toggleEditable.bind(this);
    this.handleUpdateName = this.handleUpdateName.bind(this);
    this.handleUpdateHealth = this.handleUpdateHealth.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  toggleEditable(editVariable) {
    this.setState((prevState) => {
      return {
        [editVariable]: !prevState[editVariable]
      }
    })
  }

  handleUpdateName(event) {
    const updateTo = event.target.value;
    this.props.handleUpdateCreature('creatureName', updateTo, this.props.index);
  }

  handleUpdateHealth(event) {
    const updateTo = Number(event.target.value);
    this.props.handleUpdateCreature('creatureHealth', updateTo, this.props.index);
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.toggleEditMode();
    }
  }

  render() {
    return (
      <div className='creature-card'>
        <EditableInput
          displayValue={this.props.creature.creatureName}
          editVariable='editableName'
          toggleEditable={this.toggleEditable}
          editable={this.state.editableName}
          handleChange={this.handleUpdateName}
        />
        <EditableInput
          displayValue={this.props.creature.creatureHealth}
          editVariable='editableHealth'
          toggleEditable={this.toggleEditable}
          editable={this.state.editableHealth}
          handleChange={this.handleUpdateHealth}
        />
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

export default CreatureCard;