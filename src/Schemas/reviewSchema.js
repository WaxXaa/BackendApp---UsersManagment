import { Schema, model } from 'mongoose'
const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comment: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
});
const Review = model('Review', reviewSchema)
export default Review