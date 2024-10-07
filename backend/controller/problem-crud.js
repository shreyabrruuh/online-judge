import mongoose from "mongoose";
import Problem from "../model/Problem.js";
//import Submission from "../model/SubmissionModel.js";

export const createProblem = async (req, res) => {
    // Create new Problem logic
    try {
        const {title,description,category, level, examples, constraints, TestCases} = req.body
    console.log(req.body);
    if(!(title && description && level && examples&& constraints && TestCases)){
        return res.status(400).json({message: "Please fill all fields"});
    }
    const prob = await Problem.create({
        title,
        description,
        category,
        level,
        examples,
        constraints,
        TestCases
    });


    res.status(201).json({ message: 'Problem created successfully' , prob});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
    
};

export const updateProblem = async (req, res) => {
    // Update Problem logic
    const { id } = req.params;
  const { title,description,category, level, examples, constraints, TestCases } = req.body;
    console.log(req.body);
  try {
    const problem = await Problem.findByIdAndUpdate(
      id,
      { title,description,category, level, examples, constraints, TestCases, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    res.status(200).json({ message: 'Problem updated successfully', problem });
  } catch (error) {
    console.error('Error updating problem:', error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteProblem = async (req, res) => {
    // Delete Problem logic
    const { id } = req.params;

  try {
    const problem = await Problem.findByIdAndDelete(id);

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    res.status(200).json({ message: 'Problem deleted successfully' });
  } catch (error) {
    console.error('Error deleting problem:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllProblems = async (req, res) => {
    // Get all Problems logic
    try {
        const problems = await Problem.find();
        res.status(200).json(problems);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getProblemById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid problem ID' });
      }

  try {
    const problem = await Problem.findById(id);
    
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    /*const submissionCount = await Submission.countDocuments({problemId: id});
        problem.submissionCount = submissionCount;
        await problem.save();*/

    res.status(200).json(problem);
  } catch (error) {
    console.error('Error fetching problem:', error);
    res.status(500).json({ message: error.message });
  }
};
