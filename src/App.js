import React, { Component } from 'react';
import './App.css';
import {getRecipeList} from "./requestFunctions";

class App extends Component {
    constructor(props) {
        super(props);

        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.sendSearchRequest = this.sendSearchRequest.bind(this);
        this.renderRecipes = this.renderRecipes.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleRecipeItemClick = this.handleRecipeItemClick.bind(this);

        this.state = {
            loading: false,
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
        this.sendSearchRequest(this.state.query);
    }

    handleRecipeItemClick(id) {
        console.log(id);
    }

    async sendSearchRequest(requestString) {
        this.setState({ loading: true });
        const response = await getRecipeList(requestString);
        this.setState({
            loading: false,
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
                {this.state.loading && <div className="loading-indicator">Loading...</div>}

                <form
                    className="request-form"
                    onSubmit={this.handleSearchSubmit}

                >
                    <fieldset disabled={this.state.loading}>
                        <input
                            type="text"
                            onChange={this.handleQueryChange}
                            value={this.state.query}
                            className="request-form__input"
                            placeholder="Recipe name..."
                            autoFocus
                        />
                        <button className="request-form__button">Search</button>
                    </fieldset>
                </form>

                <div className="recipe-wrapper">
                    {this.renderRecipes()}
                </div>
            </>
        );
    }
}

export default App;
