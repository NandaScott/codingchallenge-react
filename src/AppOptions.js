import React, { Component } from 'react';
import SocketContext from './socket-context';

function renameFactory (id, socket) {

    let newName = window.prompt('Enter a new name for this factory.');
    let object = {name: newName, factoryId: id};

    socket.emit('renameFactory', object);
}

function generateNumbers (id, name, socket) {
    let totalGen = window.prompt('Enter an amount of numbers to be generated. Must be between 0 and 15.');
    let min = window.prompt('Enter a number for the minimum.');
    let max = window.prompt('Enter a number for the maximum');

    let object = {
        numberOfChildren: totalGen, 
        factoryId: id, 
        name: name,
        minimum: min,
        maximum: max
    };

    socket.emit('generateNumbers', object);
}

function deleteFactory (id, socket) {
    let choice = window.confirm('Are you sure you want to delete this factory?');

    if (choice) {

        let object = {factoryId: id};

        socket.emit('deleteFactory', object);
    }

    return null;
}

function createFactory (socket) {
    let object = {name: 'RenameMe', numberOfChildren: 0}
    socket.emit('createFactory', object);
}

function ShowOptions (props) {

    const id = props.objectId;
    const name = props.name;
    const socket = props.socket;

    return (
        <ul>
            <li>
                <a onClick={() => {renameFactory(id, socket)}}>
                    Rename Factory
                </a>
            </li>
            <li>
                <a onClick={() => {generateNumbers(id, name, socket)}}>
                    Generate Numbers
                </a>
            </li>
            <li id='warning'>
                <a onClick={() => {deleteFactory(id, socket)}}>
                    Delete Factory
                </a>
            </li>
        </ul>
    );
}

function ShowRootOptions (props) {

    let socket = props.socket;

    return (
        <ul>
            <li id='root-options'>
                <a onClick={() => {createFactory(socket)}}>
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
        return (
        <SocketContext.Consumer>
            {socket => <ShowOptions 
                objectId={props.objectId}
                name={props.name}
                numberOfChildren={props.numberOfChildren}
                socket={socket}
            />}
        </SocketContext.Consumer>
        );
    }

    if (renderRootOptions) {
        return (
            <SocketContext.Consumer>
                {socket => <ShowRootOptions socket={socket}/>}
            </SocketContext.Consumer>
        );
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
        this.numberOfChildren = this.props.numberOfChildren;
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
                    numberOfChildren={this.numberOfChildren}
                />
                {button}
            </div>
        );
    }
}

