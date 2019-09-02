import React, { Component } from 'react';
import TechItem from './TechItem';

class TechList extends Component {
  state = {
    newTech: '',
    techs: []
  }
  //Executado assim que o componente aparece em tela
  componentDidMount() {
    const techs = localStorage.getItem('techs');

    if(techs) {
      this.setState({ techs: JSON.parse(techs) });
    }

  }
  //Executado sempre que houver alterações nos props ou estado
  componentDidUpdate(prevProps, prevState) {
    if(prevState.techs !== this.state.techs) {
      localStorage.setItem('techs', JSON.stringify(this.state.techs));
    }
  }
  //Executado quando o component deixa de existir
  componentWillMount() {

  }

  handleInputChange = e => {
    this.setState({ newTech: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault(); //Para não atualizar a tela
    this.setState({ 
      techs: [ ...this.state.techs, this.state.newTech ],
      newTech: '',
    });
  }

  handleDelete = (tech) => {
    this.setState({ techs: this.state.techs.filter(t => t !== tech) });
  }

  render() {
    return (
      <>
      <form onSubmit={this.handleSubmit} >
      <ul>
        {this.state.techs.map(tech => 
        <TechItem 
        key={tech} 
        tech={tech} 
        onDelete={() => this.handleDelete(tech)} 
        />
        )}
      </ul>
      <input 
      type="text" 
      onChange={this.handleInputChange} 
      value={this.state.newTech} 
      />
      <button type="submit" >Enviar</button>
      </form>
      </>
    );
  }
}

export default TechList;