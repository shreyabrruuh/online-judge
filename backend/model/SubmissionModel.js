import mongoose from "mongoose";

/*const resultSchema = new mongoose.Schema({
    passedTestCases: {
      type: Number,
      required: true,
    },
    failedTestCases: {
      type: Number,
      required: true,
    },
  }, { _id: false });*/

const submissionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Problem'
    },
    title:{
        type: String,
        required: true
    },
    language:{
        type: String,
        required: true
    },
    code: {
      type: String,
      required: true,
    },
    verdict: {
        type: String,
        required: true,
      },
      /*result: {
        type: resultSchema,
        required: true,
      },*/
      count:{
        type: Number,
        required: true,
        default: 0
      },
      submittedAt: {
        type: Date,
        default: Date.now,
      },
});

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;