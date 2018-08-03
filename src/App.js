import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from 'socket.io-client';

function ShowOptions () {

  return (
    <ul>
      <li><a onClick={() => {alert('Rename!')}}>Rename Factory</a></li>
      <li><a onClick={() => {alert('Generating Numbers!')}}>Generate Numbers</a></li>
      <li id='warning'><a onClick={() => {alert('Deleting a factory!')}}>Delete Factory</a></li>
    </ul>
  );
}

function ShowRootOptions () {
  return (
    <ul>
      <li id='root-options'><a onClick={() => {alert('Creating a factory!')}}>Create Factory</a></li>
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

class OptionsControl extends Component {
  constructor(props) {
    super(props);
    this.handleShowOptionsClick = this.handleShowOptionsClick.bind(this);
    this.handleHideOptionsClick = this.handleHideOptionsClick.bind(this);
    this.state = { isShown: false };
  }

  handleShowOptionsClick() {
    this.setState({ isShown: true });
  }

  handleHideOptionsClick() {
    this.setState({ isShown: false });
  }

  render() {
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
        <HandleOptions renderOptions={isShown} />
        {button}
      </div>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      response: undefined,
      endpoint: 'http://localhost:4001'
    }
  }

  onRecieveData = (data) => {
    this.setState({ loaded: true, response: data });
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on('FromAPI', this.onRecieveData);
  }

  render() {
    const { loaded, response } = this.state;


    if (!loaded) {
      return (<div><p>Loading...</p></div>);
    }

    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Nanda's Coding Challenge</h1>
        </header>

        <div className="table-container">
          <div className="list-type1">
            <Root payload={response} />
          </div>
        </div>
        <footer></footer>
      </div>
    );
  }
}