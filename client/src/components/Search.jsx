import React from 'react';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			query: '',
			maxResults: 5
		};
		this.search = this.search.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({
			query: e.target.value
		});
	}

	selectionHandler(e) {
		this.setState({ maxResults: e.target.value });
	}

	search() {
		this.props.getRecipes(this.state.query.toLowerCase(), this.state.maxResults);
	}

	render() {
		return (
			<div>
				<input placeholder="Add ingredients..." value={this.state.query} onChange={this.onChange} />
				<button onClick={this.search}>Search for new recipes</button>
				<select
					defaultValue="5"
					onChange={e => {
						this.selectionHandler(e);
					}}
				>
					<option>1</option>
					<option>5</option>
					<option>10</option>
					<option>15</option>
					<option>20</option>
				</select>
			</div>
		);
	}
}

export default Search;
