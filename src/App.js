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

function ShowOptions () {
  return (
    <ol>
      <li>Create Factory</li>
      <li>Rename Factory</li>
      <li>Generate Numbers</li>
      <li>Delete Factory</li>
    </ol>
  );
}

function HideOptions () {
  return (null);
}

function HandleOptions (props) {
  const renderOptions = props.renderOptions;

  if (renderOptions) {
    return <ShowOptions />;
  }

  return <HideOptions />;
}

function ShowOptionsButton (props) {
  return (
    <button onClick={props.onClick}>
      Show Options
    </button>
  );
}

function HideOptionsButton (props) {
  return (
    <button onClick={props.onClick}>
      Hide Options
    </button>
  );
}

class OptionsControl extends Component {
  constructor (props) {
    super(props);
    this.handleShowOptionsClick = this.handleShowOptionsClick.bind(this);
    this.handleHideOptionsClick = this.handleHideOptionsClick.bind(this);
    this.state = {isShown: false};
  }

  handleShowOptionsClick () {
    this.setState({isShown: true});
  }

  handleHideOptionsClick () {
    this.setState({isShown: false});
  }

  render () {
    const isShown = this.state.isShown;
    let button;

    if (isShown) {
      button = <HideOptionsButton onClick={this.handleHideOptionsClick} />;
    } else {
      button = <ShowOptionsButton onClick={this.handleShowOptionsClick} />;
    }

    return (
      <div className='options-button'>
        <HandleOptions renderOptions={isShown} />
        {button}
      </div>
    );
  }
}

function MapPayload (props) {
  return props.payload.map((anObjectMapped, index) => {
    let listValues = anObjectMapped.values.map((values, index) => 
      <li key={index}><span className="list-item">{values}</span></li>
    );

    return(
      <ol key={index}>
        <li key={index}>
          <div className="list-header">
            <h4>{anObjectMapped.name}</h4>
            <OptionsControl />
          </div>
          <ol key={index}>
            {listValues}
          </ol>
        </li>
      </ol>
    );
  })
}

function Root (props) {
  return(
      <ol>
        <li>
          <div className="list-header">
            <h3>Root</h3>
            <OptionsControl />
          </div>
          <MapPayload payload={props.payload}/>
        </li>
      </ol>
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
          <div className="list-type1">
            <Root payload={payload} />
          </div>
        </div>
      </div>
    );
  }
}