const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  console.log("Connection open!!!");
}

const moviesSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
  });

  const productSchema = new mongoose.Schema({
    name: {
          type: String,
          required: true
    },
    price: {
      type: Number,
}
  })

const Movie = mongoose.model('Movie', moviesSchema); //Model name: Movie (collection will be "movies" created by monoose)
// const Movie => This is a Model class (we can make instances of Movies class and store it in db)
// .model('Movie') => Model of the collection
// mongoose generates "movieSSS!" collection for above Model

const amadeus = new Movie({title: 'Amadues', year: 1986, score: 9.2, rating: 'R'})
// amadeus.save()
// amdeus is an object of Movie model class
// run: node  >>.load index.js(for REPL in node)  >> amadues  >> amadues.save()
// In other terminal: >>mongosh >> db.movies.find() [movie model creates instance "movieSSS"!!!]
// make cahnges on REPL node terminal amadues.score: 9.5  >> amadues.save()  >> check results on mogosh termial [db.movies.find()] 
// or write js code amadeus.save()

// below is a model method so we don not have to do movie.save()
// returns a prmoise
Movie.insertMany([
    { title: 'Amelie ',             year: 2001, score: 8.3, rating: 'R'},
    { title: 'Alien ',              year: 1979, score: 8.1, rating: 'R'},
    { title: 'The Iron Giant ',     year: 1999, score: 7.5, rating: 'PG'},
    { title: 'Stand By Me ',        year: 1986, score: 8.6, rating: 'R'},
    { title: 'Moonrise Kingdom ',   year: 2012, score: 7.3, rating: 'PG-13'}
])
    .then(data => {
        console.log("IT WORKED!")
        console.log(data);
    })

// ------------UPDATING---------------
// Model.updateOne()  => This deosnt show data after updating
// Model.updateOne({matching query}, {upating attributes})
// Movie.updateOne({title: 'Amadeus'}, {year: 1984})
// .then(res => console.log(res))

//UPDATING MULTIPLE
// more than one update
// Movie.updateMany({title: {$in: ['Amadeus', 'Stand by me']}}, {score:10})
// .then( res=> console.log(res));


// --------------DELETING----------------------
// Movie.remove({ title: 'Amelie'})
// .then(msg => console.log(msg))
// Movie.deleteMany({year: {$gte: 1999}})
// .then( msg => console.log(msg))
// Movie.findOneAndDelte