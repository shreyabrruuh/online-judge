
//import express from "express";
import Contestproblem from "../model/ContestProblem.js";

export const addContestProblem = async (req, res) => {
  const {
    title,
    description,
    level,
    examples,
    constraints,
    testCases,
    topics,
  } = req.body;

  if (
    !title ||
    !description ||
    !level ||
    !examples ||
    !constraints ||
    !testCases ||
    !topics
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newProblem = new Contestproblem({
      title,
      description,
      level,
      examples,
      constraints,
      testCases,
      topics,
    });

    const savedProblem = await newProblem.save();
    res.status(201).json(savedProblem);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

//to show all user problems to admin dashboard
export const allContestProblem = async (req, res) => {
  try {
    const problems = await Contestproblem.find();
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const allContestProblembyId = async (req, res) => {
    //console.log("reached allContestProblembyId")
  try {
    const id = req.params.id; // Trim any leading/trailing whitespace

    const problem = await Contestproblem.findById(id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.json(problem);
  } catch (error) {
    console.error("Error fetching problem:", error);
    res.status(500).json({ message: "Failed to fetch problem" });
  }
};
