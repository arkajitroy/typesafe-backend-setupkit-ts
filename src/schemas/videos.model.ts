import mongoose, { Schema, Model } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { IVideo } from '../@types/models/IVideo';

// Define the schema
const videoSchema = new Schema<IVideo>(
  {
    videoFile: {
      type: String, // cloudinary url
      required: true,
    },
    thumbnail: {
      type: String, // cloudinary url
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

// Apply the pagination plugin
videoSchema.plugin(mongooseAggregatePaginate);

// Create and export the model
const Video: Model<IVideo> = mongoose.model<IVideo>('videos', videoSchema);

export default Video;
