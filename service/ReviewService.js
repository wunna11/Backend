const Reviews = require('../model/Review');

const newReview = async (review) => {
    const item = new Reviews(review);
    return item.save();
}

module.exports = {
    newReview
}