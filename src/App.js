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
                                name={anObjectMapped.name}
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
                <MapPayload payload={props.payload} />
            </li>
        </ol>
    );
}

function updateRelevantObject (array, id, name, values) {

    for (var i in array) {
        if (array[i]._id === id) {
            array[i].name = name;
            array[i].values = values;
            break;
        }
    }

    return array;
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
            let current = updateRelevantObject(
                this.state.response,
                data._id,
                data.name,
                data.values
            );

            this.setState({ response: current });
        });

        this.socket.on('generatedNumbers', (data) => {
            let current = updateRelevantObject(
                this.state.response,
                data._id,
                data.name,
                data.values
            );

            this.setState({ response: current })
        })
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