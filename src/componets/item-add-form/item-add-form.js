import React, { Component } from 'react';
import './item-add-form.css';

export default class ItemAddForm extends Component {

  state= {
    label: ''
  };

  obLabelChange = (e) => {
    console.log(e.target.value);
    this.setState({
      label: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAdd(this.state.label);
    this.setState({
      label: ''
    });
  };


  render() {

    
    return (
      <form className="item-add-form d-flex"
            onSubmit={this.onSubmit}>
        <input type="text"
               className="form-control"
               onChange={this.obLabelChange}
               placeholder="text here"
               value={this.state.label}></input>
        <button 
          className="btn btn-outline-secondary">
          Add Item
        </button>
      </form>
    )
  }
};