import express from 'express';
const router2 = express.Router();
import UserSolvedProblem from '../model/UserSolvedProblem.js';
import { addContestProblem, allContestProblem, allContestProblembyId } from '../controller/ContestController.js';

router2.post('/addContestProblem', addContestProblem)
router2.get('/allContestProblem',allContestProblem)
router2.get('/allContestProblembyId/:id',allContestProblembyId)
//router2.get('/solvedproblems',allContestProblembyId)
router2.get('/solvedproblems/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const userSolvedProblems = await UserSolvedProblem.findOne({ user: userId });
  
      if (!userSolvedProblems) {
        return res.status(404).json({
          success: false,
          message: 'No solved problems found for the user',
        });
      }
  
      const solvedStatus = userSolvedProblems.solvedProblems.map((item) => ({
        problemId: item.problem.toString(),
        verdict: item.verdict,
      }));
  
      res.json({ success: true, solvedProblems: solvedStatus });
    } catch (error) {
      console.error('Error fetching solved problems:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch solved problems' });
    }
  });

export default router2;