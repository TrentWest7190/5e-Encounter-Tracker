import React, { Component } from 'react';
import CardGrid from '../components/CardGrid';
import CreatureInput from '../containers/CreatureInput';
//import Creatures from '../data/creatures';
import Conditions from '../data/conditions';
//import API from './util/api';

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
    this.handleUpdateCreature = this.handleUpdateCreature.bind(this);
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

  handleUpdateCreature(attribute, updateTo, index) {
    this.setState((prevState) => {
      const creatures = Array.from(prevState.creatures);
      creatures[index][attribute] = updateTo;

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
            handleUpdateCreature={this.handleUpdateCreature}
            handleUpdateConditions={this.handleUpdateConditions}
          />
        </div>
      )
    }
  }
}

export default App;
