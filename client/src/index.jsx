/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Search from './components/Search.jsx';
import Recipe from './components/Recipe.jsx';
import RecipesList from './components/RecipesList.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recipes: [],
			todayRecipe: {}
		};
		this.getRecipes = this.getRecipes.bind(this);
	}

	componentDidMount() {
		// this.getIdByUrl();
	}

	getRecipes(query, maxResults) {
		axios
			.get('/edamam/recipes', { params: { query: query, maxRecipes: maxResults } })
			.then(response => {
				this.setState({ recipes: response.data });
			})
			.catch(error => {
				console.log('error getting recipes from API FE >>>>>   ', error);
			});
	}

	getTodayRecipe() {
		axios
			.get('/api/todayrecipe')
			.then(response => this.setState({ todayRecipe: data }))
			.catch(error => console.log('ERR getting today recipe from DB', error));
	}
	render() {
		return (
			<div>
				{/* <Recipe /> */}
				{/* <RecipesList recipes={this.state.recipes} /> */}
				<Search getRecipes={this.getRecipes} />
				<div>{this.state.recipes.recipe ? this.state.recipes.recipe.label : ''}</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('recipesBook'));
