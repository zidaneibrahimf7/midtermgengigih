import mongoose from "mongoose";

const commentListSchema = new mongoose.Schema({
  videoID: {
    type: mongoose.Schema.Types.String,
    ref: 'videolist',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
    // required: true,
  },

})

const commentList = mongoose.model('commentlist', commentListSchema)

export default commentList;