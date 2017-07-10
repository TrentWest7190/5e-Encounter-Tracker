import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CreatureInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creatureName: '',
      creatureHealth: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStringChange = this.handleStringChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
  }

  handleStringChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState(() => {
      return {
        [name]: target.value
      }
    })
  }

  handleNumberChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState(() => {
      return {
        [name]: Number(target.value)
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onNewCreature({
      creatureName: this.state.creatureName,
      creatureHealth: this.state.creatureHealth,
      activeConditions: []
    });
  }

  render() {
    return (
      <form className='creature-input-form' onSubmit={this.handleSubmit}>
        <label className='formHeader' htmlFor='creatureName'>Name</label>
        <input 
          id='creatureName'
          name='creatureName'
          autoComplete='off'
          value={this.state.creatureName}
          onChange={this.handleStringChange}
        />
        <label className='formHeader' htmlFor='creatureHealth'>HP</label>
        <input 
          id='creatureHealth'
          name='creatureHealth'
          autoComplete='off'
          value={this.state.creatureHealth}
          onChange={this.handleNumberChange}
          type='number'
        />
        <button
          className='newCreatureButton'
          type='submit'
          disabled={!this.state.creatureName || this.state.creatureHealth <= 0}>
            New Creature
          </button>
      </form>
    )
  }
}

CreatureInput.propTypes = {
  onNewCreature: PropTypes.func.isRequired
}

export default CreatureInput;