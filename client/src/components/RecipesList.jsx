import React from 'react';

const RepoList = props => (
	<div>
		<h4> Available recipes </h4> {props.recipes.length} repos.
		<div>Repos list</div>
		{props.repos.map(recipe => (
			<li key={recipe.id}>
				<a target="_blank" href={recipe.html_url}>
					{recipe.name}
				</a>
				<span> Rating :{recipe.stargazers_count}</span>
				<span> By :{recipe.login ? recipe.login : recipe.owner.login}</span>
			</li>
		))}
	</div>
);

export default RepoList;
