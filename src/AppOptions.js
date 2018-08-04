import React, { Component } from 'react';

export function ShowOptions () {

    return (
        <ul>
        <li><a onClick={() => {alert('Rename!')}}>Rename Factory</a></li>
        <li><a onClick={() => {alert('Generating Numbers!')}}>Generate Numbers</a></li>
        <li id='warning'><a onClick={() => {alert('Deleting a factory!')}}>Delete Factory</a></li>
        </ul>
    );
}

export function ShowRootOptions () {
    return (
        <ul>
        <li id='root-options'><a onClick={() => {alert('Creating a factory!')}}>Create Factory</a></li>
        </ul>
    );
}

export function HideOptions () {
    return (null);
}

export function HandleOptions (props) {
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

export function ShowOptionsButton (props) {
    return (
        <button id='button' onClick={props.onClick}>
        Show Options
        </button>
    );
}

export function HideOptionsButton (props) {
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

