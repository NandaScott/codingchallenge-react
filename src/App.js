import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from 'socket.io-client';
import { OptionsControl } from './AppOptions';

function MapPayload (props) {
    return props.payload.map((anObjectMapped, index) => {
        let listValues = anObjectMapped.values.map((values, index) => 
            <li key={index} className='list-item'>{values}</li>
        );

        return(
            <ol key={anObjectMapped._id}>
                <li key={index}>
                    <div className="list-header">
                        <h4>
                            {anObjectMapped.name}
                            <OptionsControl
                                objectId={anObjectMapped._id}
                                numberOfChildren={listValues.length}
                                socket={props.socket}
                            />
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
                <MapPayload payload={props.payload} socket={props.socket}/>
            </li>
        </ol>
    );
}

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            response: undefined,
            endpoint: 'http://localhost:4001'
        }

        this.socket = socketIOClient(this.state.endpoint);

        this.socket.on('FromAPI', (data) => {
            this.setState({ loaded: true, response: data});
        });

        this.socket.on('renamedFactory', (data) => {
            let current = this.state.response;

            console.log(data);

            for (var i in current) {
                if (current[i]._id === data._id) {
                    current[i].name = data.name;
                    current[i].values = data.values;
                    break;
                }
            }

            this.setState({ response: current });
        });
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
                    <Root payload={response}/>
                </div>
            </div>
            <footer></footer>
        </div>
        );
    }
}