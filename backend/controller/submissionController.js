import Problem from '../model/Problem.js';
import Contestproblem from '../model/ContestProblem.js';
import User from '../model/Users.js';
import Submission from '../model/SubmissionModel.js';
import {generateFile}  from './generateFile.cjs';
import {generateInputFile} from './generateInput.cjs';
import {executeCode} from './executeCode.cjs';



export const createSubmission = async(req,res)=>{
    try{
        const {userId,problemId,title,language,code,verdict,count} = req.body;
        console.log(req.body);
        if (
            !userId || !problemId || !title || !language || !code || !verdict || count === null || count === undefined
        ) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const submission = await Submission.create({
            userId,problemId,title,language,code,verdict,count
        });

        res.status(201).json({
            message:"Submission created successfully",submission
        });
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}

export const submitCode = async (req, res) => {
  const { userId, problemId, language, code } = req.body;

  console.log("Request: ", req.body);

  if (code === undefined) {
    return res.status(400).json({ success: false, message: "Code is required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ success: false, message: "Problem not found" });
    }

    
    if (!problem.TestCases || problem.TestCases.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No test cases found for the problem" });
    }

    const filePath = generateFile(language, code);
    console.log("Generated file path:", filePath);

    let results = [];

    for (const [index, testCase] of problem.TestCases.entries()) {
      const testCaseInputPath = await generateInputFile(testCase.input);
      console.log("Generated input file path:", testCaseInputPath);

      try {
        // Add timeout mechanism
        const testCaseOutput = await Promise.race([
          executeCode(language, filePath, testCaseInputPath),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("TimeoutError: Execution exceeded allowed time")), 4000) 
          ),
        ]);

        console.log("Test case output:", testCaseOutput);

        const passed = testCaseOutput.trim() === testCase.expectedOutput.trim();
        results.push({
          testCase: `TestCase ${index + 1}`,
          passed,
          output: testCaseOutput.trim(),
        });

        if (!passed) {
          throw new Error(`Test Case ${index + 1} failed.`);
        }
      } catch (error) {
        let errorType;

        if (error.message.includes("TimeoutError")) {
          errorType = "Timeout Error";
        } else if (error.message.includes("Compilation Error")) {
          errorType = "Compilation Error";
        } else if (error.message.includes("Runtime Error")) {
          errorType = "Runtime Error";
        } else {
          errorType = "Unknown Error";
        }

        console.error(`Error during TestCase ${index + 1}:`, error.message);
        res.status(400).json({
          success: false,
          message: `Test case ${index + 1} failed: ${errorType}`,
          details: error.message,
          results,
        });
        return; 
      }
    }

    res.status(200).json({ success: true, verdict: "Accepted", results });
  } catch (error) {
    console.error("Error during submission:", error);
    res.status(500).json({ success: false, message: "Error: " + error.message });
  }
};





export const submitCount = async (req, res) => {
  try {
    const problems = await Problem.find({});
    const submissions = await Submission.aggregate([
      {
        $group: {
          _id: "$problemId",
          count: { $sum: 1 }
        }
      }
    ]);

    const submissionCounts = submissions.reduce((acc, submission) => {
      acc[submission._id] = submission.count;
      return acc;
    }, {});

    const problemsWithCounts = problems.map(problem => ({
      ...problem.toObject(),
      submissionCount: submissionCounts[problem._id] || 0,
    }));

    res.json(problemsWithCounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const submitControl = async(req,res)=>{
    const { problemId } = req.params;
  const { userId, code, language, verdict, result } = req.body;

  try {
    const submission = new Submission({
      userId,
      problemId,
      code,
      language,
      verdict,
      result,
      count: 1 
    });

    await submission.save();

   
    await Submission.findByIdAndUpdate(problemId, { $inc: { count: 1 } });

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}




export const submitContestCode = async(req,res)=>{
  const { userId, problemId, language, code } = req.body;

  console.log("Request: ", req.body);

  if (code === undefined) {
    return res.status(400).json({ success: false, message: 'Code is required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const Contestprob = await Contestproblem.findById(problemId);
    if (!Contestprob) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }

    if (!Contestprob.testCases || Contestprob.testCases.length === 0) {
      return res.status(400).json({ success: false, message: 'No test cases found for the problem' });
    }

    const filePath = generateFile(language, code);
    console.log('Generated file path:', filePath);

    let allPassed = true;
    let results = [];

    for (const [index, testCase] of Contestprob.testCases.entries()) {
      const testCaseInputPath = await generateInputFile(testCase.input);
      console.log('Generated input file path:', testCaseInputPath);

      const testCaseOutput = await executeCode(language, filePath, testCaseInputPath);
      console.log('Test case output:', testCaseOutput);


      const passed = testCaseOutput.trim() === testCase.output.trim();
      results.push({ testCase: `TestCase ${index + 1}`, passed, output: testCaseOutput.trim() });

      if (!passed) {
        allPassed = false;
        break;
      }
    }

    const verdict = allPassed ? 'Accepted' : 'Wrong Answer';
    res.status(200).json({ success: true, verdict, results });
  } catch (error) {
    console.error("Error during submission:", error);
    res.status(500).json({ success: false, message: "Error: " + error.message });
  }
}
