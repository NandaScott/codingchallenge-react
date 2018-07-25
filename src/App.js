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
    <ul>
      <li>Rename Factory</li>
      <li>Generate Numbers</li>
      <li id='warning'>Delete Factory</li>
    </ul>
  );
}

function ShowRootOptions () {
  return (
    <ul>
      <li id='root-options'><a onClick={alert('test')}>Create Factory</a></li>
    </ul>
  );
}

function HideOptions () {
  return (null);
}

function HandleOptions (props) {
  const renderOptions = props.renderOptions;
  const renderRootOptions = props.renderRootOptions;

  if (renderOptions) {
    return <ShowOptions />;
  }

  if (renderRootOptions) {
    return <ShowRootOptions />;
  }

  return <HideOptions />;
}

function ShowOptionsButton (props) {
  return (
    <button id='button' onClick={props.onClick}>
      Show Options
    </button>
  );
}

function HideOptionsButton (props) {
  return (
    <button id='button' onClick={props.onClick}>
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

    if (this.props.renderRootOptions) {
      return (
        <div className='options-styling'>
          <HandleOptions renderRootOptions={isShown} />
          {button}
        </div>
      );
    }

    return (
      <div className='options-styling'>
        <HandleOptions renderOptions={isShown}/>
        {button}
      </div>
    );
  }
}

function MapPayload (props) {
  return props.payload.map((anObjectMapped, index) => {
    let listValues = anObjectMapped.values.map((values, index) => 
      <li key={index} className='list-item'>{values}</li>
    );

    return(
      <ol key={index}>
        <li key={index}>
          <div className="list-header">
            <h4>
              {anObjectMapped.name}
              <OptionsControl />
            </h4>
          </div>
          <ol key={index} className='horizontal-list'>
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
            <h3>
              Root
              <OptionsControl renderRootOptions={true}/>
            </h3>
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