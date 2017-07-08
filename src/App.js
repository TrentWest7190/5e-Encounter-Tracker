import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardGrid from './components/CardGrid';
import Creatures from './creatures';
import Conditions from './conditions';
//import API from './util/api';

class CreatureInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creatureName: '',
      creatureHealth: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleHealthChange = this.handleHealthChange.bind(this);
  }

  handleNameChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState(() => {
      return {
        [name]: target.value
      }
    })
  }

  handleHealthChange(event) {
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
          onChange={this.handleNameChange}
        />
        <label className='formHeader' htmlFor='creatureHealth'>HP</label>
        <input 
          id='creatureHealth'
          name='creatureHealth'
          autoComplete='off'
          value={this.state.creatureHealth}
          onChange={this.handleHealthChange}
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creatures: [{
        creatureName: 'test',
        creatureHealth: 100,
        activeConditions: []
      }],
      conditions: Conditions.results,
      isLoading: false
    }

    this.handleNewCreature = this.handleNewCreature.bind(this);
    this.handleRemoveCreature = this.handleRemoveCreature.bind(this);
    this.handleUpdateHealth = this.handleUpdateHealth.bind(this);
    this.handleUpdateConditions = this.handleUpdateConditions.bind(this);
  }

  async componentDidMount() {
    //removed until api uses https
    /*const conditions = await API.getConditions();
    this.setState(() => {
      return {
        conditions,
        isLoading: false
      }
    })*/
  }

  handleNewCreature(creature) {
    this.setState((prevState) => {
      return {
        creatures: prevState.creatures.concat(creature)
      }
    })
  }

  handleRemoveCreature(index) {
    this.setState((prevState) => {
      const creatures = Array.from(prevState.creatures);
      creatures.splice(index, 1);
      return {
        creatures
      }
    })
  }

  handleUpdateHealth(updateBy, index) {
    this.setState((prevState) => {
      const creatures = Array.from(prevState.creatures);
      creatures[index].creatureHealth += updateBy;

      return {
        creatures
      }
    })
  }

  handleUpdateConditions(condName, index) {
    this.setState((prevState) => {
      const creature = prevState.creatures[index];
      if (creature.activeConditions.includes(condName)) {
        creature.activeConditions.splice(creature.activeConditions.indexOf(condName), 1);
        return {
          creatures: prevState.creatures
        }
      } else {
        creature.activeConditions.push(condName)
        return {
          creatures: prevState.creatures
        }
      }
    })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      )
    } else {
      return (
        <div className="App">
          <CreatureInput onNewCreature={this.handleNewCreature}/>
          <CardGrid 
            creatures={this.state.creatures}
            conditions={this.state.conditions}
            handleRemoveCreature={this.handleRemoveCreature}
            handleUpdateHealth={this.handleUpdateHealth}
            handleUpdateConditions={this.handleUpdateConditions}
          />
        </div>
      )
    }
  }
}

export default App;
