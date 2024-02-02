import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;
const mongooseValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  fname: {
    type: String,
    minlength: 2,
    maxlength: 16,
  },
  lname: {
    type: String,
    minlength: 2,
    maxlength: 16,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 30,
  },
  birthDate: {
    type: Date,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'AccommodationPost',
  }],
}, { timestamps: true });
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})
mongoose.plugin(mongooseValidator)

const User = model('User', userSchema);

export default User;
