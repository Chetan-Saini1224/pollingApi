import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  options: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Options",
    },
  ],
});

const Questions = mongoose.model("Questions", questionsSchema);

export default Questions;
