import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('drink coffe'),
      this.createTodoItem('make awesome app'),
      this.createTodoItem('have a lunch')
    ],
    term: '',
    filter: 'all'
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {

      const idx = todoData.findIndex((el) => el.id === id);
      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);

      const newArray = [ ...before, ...after];

      return {
        todoData: newArray
      };

    });
  };

  addItem = (text) => {
    console.log(67);
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArray = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArray
      };

    })
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

      const oldItem = arr[idx];
      const newItem = {...oldItem, [propName]: !oldItem[propName]};

      const before = arr.slice(0, idx);
      const after = arr.slice(idx + 1);

      return [ ...before, newItem, ...after];

  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
    
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
      
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
    
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };

    });
  };

  onSearchChange = (term) => {
    this.setState({ term });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  search (items, term) {
    if (term === 0) {
      return items;
    };

    return items.filter((item) => {
      return item.label
              .toLowerCase()
              .indexOf(term.toLowerCase()) > -1;
    });
  }

  filter (items, filter) {

    switch(filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  render() {
    const { todoData, term, filter } = this.state;

    const visiableItems = this.filter(this.search(todoData, term), filter);

    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={ todoCount } done={ doneCount } />
  
        <div className="top-panel d-flex">
          <SearchPanel
           onSearchChange={this.onSearchChange} />
          <ItemStatusFilter 
          filter={filter}
          onFilterChange={this.onFilterChange} />
        </div>
  
        <TodoList 
        todos={visiableItems}
        onDeleted={this.deleteItem}
        onToggleImportant={this.onToggleImportant}
        onToggleDone={this.onToggleDone} />

        <ItemAddForm 
        onAdd={this.addItem} />
      </div>
    );
  };


};
