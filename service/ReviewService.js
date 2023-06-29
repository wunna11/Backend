const Reviews = require('../model/Review');
const mongoose = require('mongoose');

const getAllReview = async () => {
    return Reviews.find();
}

const newReview = async (review) => {
    const item = new Reviews(review);
    return item.save();
}

const getReviewById = async (movieId) => {
    const review = await Reviews.findById(movieId);
    return review;
}

const updateReview = async (reviewId, review) => {
    const newReview = await Reviews.findByIdAndUpdate(reviewId, review, { new: true });
    return newReview;
}

const deleteReview = async (reviewId) => {
    const deletedReview = await Reviews.findByIdAndDelete(reviewId);
    return deletedReview;
}

const getReviewByMovieId = async (movieId) => {
    const review = await Reviews.find({
        movie: new mongoose.Types.ObjectId(movieId)
    });
    return review;
}

module.exports = {
    newReview,
    getAllReview,
    getReviewById,
    updateReview,
    deleteReview,
    getReviewByMovieId
}