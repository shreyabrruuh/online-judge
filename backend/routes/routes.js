import express from 'express';
import { forgotpassword , resetpassword } from '../controller/auth-role.js';
import { authMiddleware } from '../utils/auth-middelware.js';
import User from '../model/Users.js';
import {Register} from '../controller/register-control.js'
import {Login, logout} from '../controller/Login-control.js'
import {createProblem, updateProblem, deleteProblem, getAllProblems, getProblemById } from '../controller/problem-crud.js';
import { saveCode, getCode } from '../controller/codeController.js';
import {submitCode, submitContestCode, submitControl, createSubmission} from '../controller/submissionController.js';

const router = express.Router();

router.post('/register', Register)
//router.post('/verify-email', verifyEmail)
router.post('/login', Login)
router.post('/logout', logout)
router.post('/forgot-password', forgotpassword)
router.post('/reset-password/:id/:token', resetpassword)

router.post('/submission', createSubmission)
router.get('/submission/:id', submitControl)
router.post('/submit', submitCode)
router.post('/Contestsubmit', submitContestCode)

router.get('/user', authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('username role');
      console.log(user);
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

  // Save code
router.post('/save', saveCode);

// Get code
router.get('/code/get/:id', getCode);

// Routes for regular users
router.get('/problem', getAllProblems);
router.get('/problem/:id', getProblemById);
// Routes for admin users
router.post('/problem', createProblem);
router.put('/problem/:id', updateProblem);
router.delete('/problem/:id', deleteProblem);


export default router;