const express = require('express');
const router = express.Router();
const Movies = require("../model/Movie");
const Reviews = require("../model/Review");
const reviews = require('./../controller/ReviewController');

router.get('/', reviews.getAllReview);
router.post('/', reviews.saveReview);
router.get('/:id', reviews.getReviewById);
router.patch('/:id', reviews.updateReview);
router.delete('/:id', reviews.deleteReview);
router.get('/movie/:id', reviews.reviewByMovieId);

module.exports = router;