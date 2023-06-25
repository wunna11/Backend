const reviewService = require('../service/ReviewService');
const mongoose = require('mongoose');

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

module.exports = {
    saveReview
}