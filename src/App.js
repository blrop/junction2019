import React, { Component } from 'react';
import './reset.css';
import './App.css';
import {getRecipe, getRecipeList} from "./requestFunctions";

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
            searchFieldIsFalid: true,
            recipesFound: true
        };
    }

    handleQueryChange(e) {
        this.setState({
            query: e.target.value,
            searchFieldIsFalid: true
        })
    }

    handleSearchSubmit(e) {
        e.preventDefault();
        if (this.state.query && this.state.query !== '') {
            this.sendSearchRequest(this.state.query);
            if (this.state.recipes.length === 0) {
                this.setState({
                    recipesFound: false
                });
                console.log('no recipes found')
            } else {
                this.setState({
                    recipesFound: true
                });
            }

        } else {
            this.setState({
                searchFieldIsFalid: false
            })
        }
    }

    async sendSearchRequest(requestString) {
        this.setState({ loading: true });
        const response = await getRecipeList(requestString);
        this.setState({
            loading: false,
            recipes: response.suggestions,
        });
    }

    async handleRecipeItemClick(id) {
        this.setState({ loading: true });
        const recipes = await getRecipe(id);
        console.log(recipes);
        this.setState({ loading: false });
    }

    renderRecipes() {
        return this.state.recipes.map(item => (
            <div className="recipe-item" key={item.payload} onClick={() => this.handleRecipeItemClick(item.payload)}>
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
                            className={this.state.searchFieldIsFalid ? 'request-form__input' : 'request-form__input error'}
                            placeholder="Recipe name..."
                            autoFocus
                        />
                        <button className="request-form__button">Search</button>
                    </fieldset>
                </form>

                <div className="recipe-wrapper">
                    {this.state.recipesFound ? this.renderRecipes() : 'Sorry, no recieps found for your request'}
                </div>
            </>
        );
    }
}

export default App;
