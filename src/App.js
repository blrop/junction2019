import React, { Component } from 'react';
import './App.css';
import { getRecipe, getRecipeList, getStoresNearby, getProductsByStore, getPictures } from "./requestFunctions";
import _ from 'lodash';

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
            recipes: {},
            selectedRecipes: [],
        };
    }

    componentDidMount() {
        this.loadStores();
        this.loadRecipePictures();
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

    async sendSearchRequest(requestString) {
        this.setState({ loading: true });
        const response = await getRecipeList(requestString);
        this.setState({
            loading: false,
            recipes: _.keyBy(response.suggestions, item => item.payload),
        });
    }

    async handleRecipeItemClick(id) {
        this.setState({ loading: true });
        const recipes = await getRecipe(id);
        const updatedRecipes = { ...this.state.recipes };
        recipes.forEach(item => {
            if (!updatedRecipes[item.Id]) {
                console.log('error');
            }
            updatedRecipes[item.Id].data = item;
        });
        this.setState({
            loading: false,
            recipes: updatedRecipes,
        });
    }

    async loadStores() {
        console.log(await getStoresNearby());
    }

    async loadRecipePictures() {
        const pictures = await getPictures();
    }

    renderRecipes() {
        return _.map(this.state.recipes, item => (
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
