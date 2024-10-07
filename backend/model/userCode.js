import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
    problemId: { type: String, required: true, unique: true },
    code: { type: String, required: true }
  });

  const userCode = mongoose.model('userCode', codeSchema);
  export default userCode;