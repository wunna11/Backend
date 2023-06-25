const Movies = require('../model/Movie');

const getAllMovie = async () => {
    return Movies.find();
}

const newMovie = async (movie) => {
    const item = new Movies(movie);
    return item.save();
}

const updateMovie = async (movieId, movie) => {
    const newMovie = await Movies.findByIdAndUpdate(movieId, movie, { new: true });
    return newMovie;
}

const deleteMovie = async (movieId) => {
    const deletedmovie = await Movies.findByIdAndDelete(movieId);
    return deletedmovie;
}

module.exports = {
    getAllMovie,
    newMovie,
    updateMovie,
    deleteMovie
};