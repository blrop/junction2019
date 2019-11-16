import React, { Component } from 'react';

export default class Img extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valid: true,
        };

        this.handleError = this.handleError.bind(this);
    }

    handleError() {
        this.setState({
            valid: false,
        });
    }

    render() {
        return (
            <img
                src={this.state.valid ? this.props.src : '/no.png'}
                onError={this.handleError}
                alt=""
            />
        );
    }
}
