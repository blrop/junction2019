import React, { Component } from 'react';
import './reset.css';
import './App.css';
import { getRecipe, getRecipeList, getStoresNearby, getProductsByStore, getProductDetailsFromStore } from "./requestFunctions";
import _ from 'lodash';
import {PICTURE_LINK} from "./constants";
import classNames from 'classnames';
import {MAP_DEFAULT_PROPS} from "./constants";

import GoogleMapReact from 'google-map-react';
import Img from "./Img";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class App extends Component {
    static defaultProps = MAP_DEFAULT_PROPS;

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
            searchFieldIsFalid: true,
            recipesFound: true,
            preparationTime: '',
            ingredients: '',
            instructions: ''
        };
    }

    componentDidMount() {
        this.loadStores();
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
            recipes: _.keyBy(response.suggestions, item => item.payload),
        });
    }

    async handleRecipeItemClick(id) {
        let updatedRecipes = { ...this.state.recipes };


        updatedRecipes = _.mapValues(this.state.recipes, item => {
            item.expanded = (item.payload === id);
            return item;
        });

        this.setState({ loading: true });
        const recipes = await getRecipe(id);
        recipes.forEach(item => {
            if (!updatedRecipes[item.Id]) {
                console.log('error');
            }
            updatedRecipes[item.Id].data = item;
            updatedRecipes[item.Id].expanded = true;
        });

        this.setState({
            loading: false,
            recipes: updatedRecipes,
            preparationTime: recipes[0].PreparationTime.Description,
            ingredients: recipes[0].Ingredients[0].SubSectionIngredients.map((item) => item[0].Name),
            instructions: recipes[0].Instructions,

        });
        console.log('preparationTime: ', this.state.preparationTime);
        console.log('ingredients: ', this.state.ingredients);
        console.log('instructions: ', this.state.instructions);
    }

    async loadStores() {
        console.log(await getStoresNearby());
    }

    renderRecipes() {
        return _.map(this.state.recipes, item => {
            const id = item.payload;
            return (
                <div
                    className={classNames("recipe-item", {
                        "recipe-item--expanded": item.expanded,
                    })}
                    key={id}
                    onClick={() => this.handleRecipeItemClick(id)}
                >
                    <div className="recipe-item__picture">
                        <Img src={`${PICTURE_LINK}${id}?w=200&h=150&fit=clip`} />
                    </div>
                    <div className="item-description">
                        <div className="recipe-item__title">{item.suggestion}</div>
                        {item.expanded && <div>
                            <div className="preparation-time">{this.state.preparationTime}</div>
                            <div className="ingredients">{this.state.ingredients}</div>
                            <div className="instructions">{this.state.instructions}</div>
                        </div>}
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <>
                {this.state.loading && <div className="loading-indicator">Loading...</div>}

                <h1>Save your money. Reduce food waste.</h1>
                <h2>What do you want to cook?</h2>
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
        <div style={{ height: '100vh', width: '100%' }}>
<GoogleMapReact
    bootstrapURLKeys={{ key: 'AIzaSyAlDha-FyRkP7V7B8E3SyxhtCYqeL_6nPI' }}
    defaultCenter={this.props.center}
    defaultZoom={this.props.zoom}

        >
        <AnyReactComponent
    lat={60.1603071}
    lng={24.8751406}
    text="My Marker"
        />
        </GoogleMapReact>
        </div>
            </>
        );
    }
}

export default App;
