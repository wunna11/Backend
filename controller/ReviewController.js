const reviewService = require('../service/ReviewService');
const mongoose = require('mongoose');

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

async function getAllReviewHandler(req, res, next) {
    const reviews = await reviewService.getAllReview();
    if(!reviews) throw Error('No reviews');
    await res.status(200).json(reviews);
}

const getAllReview = async function (req, res, next) {
    await handle(getAllReviewHandler,400)
        (req,res,next);
}

const saveReview = async function (req, res, next) {
    try {
        const reivew = await reviewService.newReview({
            movie: new mongoose.Types.ObjectId(req.body.movie),
            rating: req.body.rating,
            review:req.body.review,
        });
        if(!reivew) throw Error('Cannot save reivew');
        await res.status(201).json(reivew);
    } catch(err) {
        console.log(err);
        await res.status(400).json({message: err})
    }
}

const getReviewById = async function (req, res, next) {
    const reviewId = req.params.id;
    console.log('reviewId', reviewId);
    try {
        const review= await reviewService.getReviewById(reviewId)
        if (!review) throw Error('Cannot get review');
        await res.status(201).json(review);
    } catch (err) {
        console.log(err);
        await res.status(400).json({message: err})
    }
}

const updateReview = async function (req, res, next) {
    const reviewId = req.params.id;
    const review = req.body;
    try {
        const updatedReivew = await reviewService.updateReview(reviewId, review);
        if(!updatedReivew) throw Error('Cannot update review');
        await res.status(201).json(review);
    } catch(err) {
        console.log(err);
        await res.status(400).json({message: err})
    }
}

const deleteReview = async function (req, res, next) {
    const reviewId = req.params.id;
    try {
        const deletedReview = await reviewService.deleteReview(reviewId);
        if(!deletedReview) throw Error('Cannot delete review');
        await res.status(201).json(deletedReview);
    } catch(err) {
        console.log(err);
        await res.status(400).json({message: err})
    }
}

const reviewByMovieId = async function (req, res, next) {
    const movieId = req.params.id
    try {
        const review = await reviewService.getReviewByMovieId(movieId);
        if(!review) throw Error('Cannot get review by movieId');
        await res.status(201).json(review);
    } catch (err) {
        console.log(err);
        await res.status(400).json({message: err})
    }
}

module.exports = {
    saveReview,
    getAllReview,
    getReviewById,
    updateReview,
    deleteReview,
    reviewByMovieId
}