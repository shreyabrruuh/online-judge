import mongoose from "mongoose";
const Schema = mongoose.Schema;

const exampleSchema = new mongoose.Schema({
    inputExample: {
      type: String,
      required: true,
    },
    outputExample: {
      type: String,
      required: true,
    }
  }, { _id: false });

const ConstestProblemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  examples: [exampleSchema],
  constraints: {
    type: String,
    required: true,
  },
  testCases: [
    {
      input: String,
      output: String,
    },
  ],
  topics: {
    type: String,
    required: true,
  },
});

const Contestproblem = mongoose.model('Contestproblem', ConstestProblemSchema);
export default Contestproblem;