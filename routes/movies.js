const express = require('express');
const router = express.Router();
const movies = require('./../controller/MovieController');

router.get('/', movies.getAllMovie);
router.post('/', movies.saveMovie);
router.get('/:id', movies.getMovieById);
router.patch('/:id', movies.updateMovie);
router.delete('/:id', movies.deleteMovie);

module.exports = router;