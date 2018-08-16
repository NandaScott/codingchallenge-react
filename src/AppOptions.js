import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

function renameFactory (id) {
    let newName = prompt('Enter a new name for this factory.');
    const socket = socketIOClient('http://localhost:4001');

    let object = {name: newName, factoryId: id};

    socket.emit('renameFactory', id, object);
}

function generateNumbers (id, name) {
    let totalGen = prompt('Enter an amount of numbers to be generated. Must be between 0 and 15.');
    const socket = socketIOClient('http://localhost:4001');

    let object = {numberOfChildren: totalGen, factoryId: id, name: name};

    socket.emit('generateNumbers', id, object);
}

function deleteFactory () {
    return null;
}

function ShowOptions (props) {

    const id = props.objectId;
    const name = props.name;

    return (
        <ul>
            <li>
                <a onClick={() => {renameFactory(id)}}>
                    Rename Factory
                </a>
            </li>
            <li>
                <a onClick={() => {generateNumbers(id, name)}}>
                    Generate Numbers
                </a>
            </li>
            <li id='warning'>
                <a onClick={() => {deleteFactory(id)}}>
                    Delete Factory
                </a>
            </li>
        </ul>
    );
}

function ShowRootOptions () {
    return (
        <ul>
            <li id='root-options'>
                <a onClick={() => {alert('Creating a factory!')}}>
                    Create Factory
                </a>
            </li>
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
        return <ShowOptions 
            objectId={props.objectId}
            name={props.name}
        />;
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

export class OptionsControl extends Component {
    constructor(props) {
        super(props);
        this.handleShowOptionsClick = this.handleShowOptionsClick.bind(this);
        this.handleHideOptionsClick = this.handleHideOptionsClick.bind(this);
        this.objectId = this.props.objectId;
        this.name = this.props.name;
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
                <HandleOptions 
                    renderOptions={isShown}
                    objectId={this.objectId}
                    name={this.name}
                />
                {button}
            </div>
        );
    }
}

