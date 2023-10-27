const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "This is repeated Name"],
    required: [true, "must provide a name"],
    trim: true,
    // maxlength: [20, "name can not be more than 20 charachters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  IAMID: {
    type: Number,
    trim: true,
  },
  country: {
    type: String,
  },
  category: {
    type: String,
    required: [true, "Must provide a category"],
  },
  images: {
    type: Number,
  },
  binary: {
    type: Number,
  },
  longNumbers: {
    type: Number,
  },
  speedNumbersOne: {
    type: Number,
  },
  speedNumbersTwo: {
    type: Number,
  },
  namesAndFaces: {
    type: Number,
  },
  words: {
    type: Number,
  },
  longCards: {
    type: Number,
  },
  dates: {
    type: Number,
  },
  spokenOne: {
    type: Number,
  },
  spokenTwo: {
    type: Number,
  },
  spokenThree: {
    type: Number,
  },
  speedCardsScoreOne: {
    type: Number,
  },
  speedCardsTimeOne: {
    type: Number,
  },
  speedCardsScoreTwo: {
    type: Number,
  },
  speedCardsTimeTwo: {
    type: Number,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
