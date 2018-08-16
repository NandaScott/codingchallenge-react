import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

function renameFactory (id, numberOfChildren) {
    let newName = prompt('Enter a new name for this factory.');
    const socket = socketIOClient('http://localhost:4001');

    let object = {name: newName, factoryId: id};

    socket.emit('renameFactory', id, object);
}

function generateNumbers () {
    return null;
}

function deleteFactory () {
    return null;
}

function ShowOptions (props) {

    const id = props.objectId;
    const numberOfChildren = props.numberOfChildren;

    return (
        <ul>
            <li>
                <a onClick={() => {renameFactory(id, numberOfChildren)}}>
                    Rename Factory
                </a>
            </li>
            <li>
                <a onClick={() => {generateNumbers(id)}}>
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
            numberOfChildren={props.numberOfChildren}
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
                    numberOfChildren={this.numberOfChildren}
                />
                {button}
            </div>
        );
    }
}

