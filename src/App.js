import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const rn = require('random-number');
const randomNames = require('random-name');

// This block will mimic the payload from the API
let payload = [];
for (let i = 0; i < rn({min:1, max: 15, integer:true}); i++) {
  let arr = [];
  for (let i = 0; i < rn({min:1, max:15, integer:true}); i++) {
    arr.push(rn({min:100, max:999, integer:true}));
  }

  payload.push({name: randomNames(), values: arr});
}

function MapPayload (props) {
  return props.payload.map((anObjectMapped, index) => {
    let listValues = anObjectMapped.values.map((values, index) => 
      <li key={index}>{values}</li>
    );

    return(
      <ul key={index}>
        <li key={index}>{anObjectMapped.name}
          <ul key={index}>
            {listValues}
          </ul>
        </li>
      </ul>
    );
  })
}

function Root (props) {
  return(
      <ul>
        <li>Root
          <MapPayload payload={props.payload}/>
        </li>
      </ul>
  );
}


export default class App extends Component {
  render() {
    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Nanda's Coding Challenge</h1>
        </header>

        <div className="table-container">
          <Root payload={payload} />
        </div>
      </div>
    );
  }
}