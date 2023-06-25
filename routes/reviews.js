const express = require('express');
const router = express.Router();
const Movies = require("../model/Movie");
const Reviews = require("../model/Review");
const reviews = require('./../controller/ReviewController');

router.post('/', reviews.saveReview);


module.exports = router;