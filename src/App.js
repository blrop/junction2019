import React, { Component } from 'react';
import './App.css';
import {APP_KEY, REQUEST_URL} from "./constants";

class App extends Component {
    constructor(props) {
        super(props);

        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.renderRecipes = this.renderRecipes.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleRecipeItemClick = this.handleRecipeItemClick.bind(this);

        this.state = {
            query: '',
            recipes: [],
        };
    }

    handleQueryChange(e) {
        this.setState({
            query: e.target.value,
        });
    }

    handleSearchSubmit(e) {
        e.preventDefault();
        this.sendRequest(this.state.query);
    }

    handleRecipeItemClick(id) {
        console.log(id);
    }

    async sendRequest(requestString) {
        const objectToSend = {
            query: requestString,
        };

        const rawResponse = await fetch(`${REQUEST_URL}/v1/suggestions/recipes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Ocp-Apim-Subscription-Key': APP_KEY,
            },
            body: JSON.stringify(objectToSend),
        });
        const text = await rawResponse.text();
        console.log(text);
        const response = JSON.parse(text);
        this.setState({
            recipes: response.suggestions,
        });
    }

    renderRecipes() {
        return this.state.recipes.map(item => (
            <div className="recipe-item" key={item.payload} onClick={() => this.handleRecipeItemClick(item.payload)}>
                <div className="recipe-item__id">{item.payload}</div>
                <div className="recipe-item__title">{item.suggestion}</div>
            </div>
        ));
    }

    render() {
        return (
            <>
                <form className="request-form" onSubmit={this.handleSearchSubmit}>
                    <input
                        type="text"
                        onChange={this.handleQueryChange}
                        value={this.state.query}
                        className="request-form__input"
                        placeholder="Recipe name..."
                    />
                    <button className="request-form__button">Search</button>
                </form>
                <div className="recipe-wrapper">
                    {this.renderRecipes()}
                </div>
            </>
        );
    }
}

export default App;
