const movieService = require('../service/MovieService');

const handle = function(func,httpErrorCode)
{
    return async function(req,res,next)
    {
        try
        {
            func(req,res,next).catch(err=> {
                return res.status(httpErrorCode).json({message: err})
            });
        }catch (err)
        {
            console.log("Error is ",err);
            await res.status(httpErrorCode).json({message: err})
        }
    }
}

async function getAllMovieHandler(req, res, next) {
    const movies = await movieService.getAllMovie();
    if(!movies) throw Error('No movies');
    await res.status(200).json(movies);
}

const getAllMovie = async function (req, res, next) {
    console.log('Movie controller user ',req.user);
    await handle(getAllMovieHandler,400)
        (req,res,next);
}

const saveMovie = async function (req, res, next) {
    try {
        const movie = await movieService.newMovie(req.body);
        if(!movie) throw Error('Cannot save movie');
        await res.status(201).json(movie);
    } catch(err) {
        console.log(err);
        await res.status(400).json({message: err})
    }
}

const updateMovie = async function (req, res, next) {
    const movieId = req.params.id;
    console.log('movie id', movieId);
    const movie = req.body;
    try {
        const updatedMovie = await movieService.updateMovie(movieId, movie);
        if(!updatedMovie) throw Error('Cannot update movie');
        await res.status(201).json(movie);
    } catch(err) {
        console.log(err);
        await res.status(400).json({message: err})
    }
}

const deleteMovie = async function (req, res, next) {
    const movieId = req.params.id;
    try {
        const deletedMovie = await movieService.deleteMovie(movieId);
        if(!deletedMovie) throw Error('Cannot delete movie');
        await res.status(201).json(deletedMovie);
    } catch(err) {
        console.log(err);
        await res.status(400).json({message: err})
    }
}

module.exports = {
    getAllMovie,
    saveMovie,
    updateMovie,
    deleteMovie
};
