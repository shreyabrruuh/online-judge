import mongoose from "mongoose";

const TestCaseSchema = new mongoose.Schema({
    input: {
      type: String,
      required: true,
    },
    expectedOutput: {
      type: String,
      required: true,
    }
  }, { _id: false });

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

const problemSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
      type:String,
      required:true
  },
    level:{
        type:String,
        required:true
    },
    examples: [exampleSchema],
    constraints:{
        type:String,
        required:true
    },
    TestCases: [TestCaseSchema],
   createdAt: {
    type: Date,
    default: Date.now,
  },
   updatedAt: {
    type: Date,
    default: Date.now,
  }

});

problemSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });
  
  problemSchema.pre('findOneAndUpdate', function(next) {
    this._update.updatedAt = Date.now();
    next();
  });
  
  const Problem = mongoose.model('Problem', problemSchema);
  
  export default Problem;