const axios = require('axios');
const parser = require('body-parser');
const express = require('express');
const path = require('path');
const compression = require('compression');
const morgan = require('morgan');
const { APP_ID, APP_KEY } = require('./../config/config.js');

const app = express();

app.use(morgan('dev'));
app.use(compression());
app.use(parser.urlencoded({ extended: true }));

// app.get('*.js', (req, res, next) => {
// 	req.url = `${req.url}.gz`;
// 	res.set('Content-Encoding', 'gzip');
// 	next();
// });

app.use(express.static(`${__dirname}/../client/dist`));
app.use(parser.json());
//curl "https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free"

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
//get recipes from API based on ingredients
app.get('/edamam/recipes', (req, res) => {
	// console.log('req.params >>>>>>>>>>', req.query.query);
	// console.log(APP_ID);
	// let query = ['chicken'];
	axios
		.get(
			`https://api.edamam.com/search?q=${req.query.query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=${
				req.query.maxRecipes
			}`
		)
		.then(data => {
			console.log('data from the api', data.data.hits);

			res.send(data.data.hits[0]);
		})
		.catch(error => console.log('error getting recipes from API', error));
});

//get suggested recipe for today that has not been cooked for sometime
app.get('/api/todayrecipe', (req, res) => {
	//call DB function to get a random recipe
	res.send('today recipe');
});

const port = process.env.PORT || 7000;
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
