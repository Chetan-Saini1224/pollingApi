import mongoose from "mongoose";

const optionsSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    required: true,
  },
  link_to_vote: {
    type: String,
  },
});

const Options = mongoose.model("Options", optionsSchema);

export default Options;
