import mongoose from "mongoose";

const videoListSchema = new mongoose.Schema(
  {
    videoTitle: {
      type: String,
      required: true
    },
    videoID: {
      type: String,
      required: true
    },
    urlImg: {
      type: String,
      required: true
    },
  }
)

const videolist = mongoose.model('videolist', videoListSchema);

export default videolist