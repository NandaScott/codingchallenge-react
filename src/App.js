import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const rn = require('random-number');

function Root (props) {
  return (
      <ul>
        <li>Root
          <Factory names={props.names} numbers={props.numbers}/>
        </li>
      </ul>
  );
}

function Factory (props) {
  const names = props.names;

  const list_names = names.map((name) => 
  <li>{name}<Numbers numbers={props.numbers}/></li>
  );

  return (
    <ul>{list_names}</ul>
  );
}

function Numbers (props) {
  const numbers = props.numbers;

  const list_numbers = numbers.map((numbers) =>
  <li>{numbers}</li>
  );

  return (
    <ul>{list_numbers}</ul>
  );
}

const factory_names = ["Factory1", "Memes"];
const numbers = [];

for (let i = 0; i < 15; i++) {
  numbers.push(rn({min:100, max:999, integer: true}));
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Nanda's Coding Challenge</h1>
        </header>

        <div className="table-container">
          <Root names={factory_names} numbers={numbers} />
        </div>
      </div>
    );
  }
}

export default App;