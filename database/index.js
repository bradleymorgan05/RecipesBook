const mongoose = require('mongoose');

mongoose.connect('mongodb://testuser:test123@ds163013.mlab.com:63013/recipe_book', { useNewUrlParser: true });

const recipe = mongoose.Schema({
  id: Number,
  name: String,
  login: String,
  description: String,
  url: String,
  html_url: String,
  stargazers_count: Number,
});

const Repository = mongoose.model('Repository', repoSchema);

const save = repos => Promise.all(
  repos.map(repo => Repository.findOneAndUpdate(
    { id: repo.id },
    {
      id: repo.id,
      name: repo.name,
      login: repo.owner.login,
      description: repo.description,
      url: repo.url,
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count,
    },
    { upsert: true },
  ).exec()),
);

const retrieve = (callback) => {
  Repository.find({})
    .sort({ stargazers_count: 'descending' }) // can use ('-stargazers_count')
    .limit(25)
    .exec((error, data) => {
      if (error) {
        console.log('Could not retrieve records from DB', error);
      } else {
        callback(null, data);
      }
    });

  /*
return Repository
  .find({})
  .sort({ stargazers_count: 'descending' }) //can use ('-stargazers_count')
  .limit(25)
  .exec()
  */
};

const deleteAll = () => {
  Repository.collection.drop();
};

module.exports.save = save;
module.exports.retrieve = retrieve;
module.exports.deleteAll = deleteAll;


https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free
