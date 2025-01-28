const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { generateFile } = require('./generateFile.js');
const { generateInputFile } = require('./generateInput.js');
const {executeCode} = require('./executeCode.js')

const app = express();
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  res.json({ online: 'compiler' });
});

app.post('/run', async (req, res) => {
  const { language, code, input } = req.body;

  if (code === undefined) {
    return res.status(400).json({ success: false, message: 'Code is required' });
  }

  try {
    const filePath = generateFile(language, code);
    const inputPath = await generateInputFile(input);
    const output1 = await executeCode(language,filePath, inputPath);
    console.log(output1);
    res.status(200).json({ filePath, inputPath, output1 });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error: " + error.message });
  }
});
/*
API_URL = 'http://localhost:8000';

app.post('/submit/:id', async (req, res) => { // Modified to get the 'id' parameter from the URL
  const { language, code } = req.body;
  const { id } = req.params; // Get the 'id' parameter from the request URL

  if (code === undefined) {
    return res.status(400).json({ success: false, message: 'Code is required' });
  }

  try {
    const { data } = await axios.get(`${API_URL}/problem/${id}`);
    console.log(data);
    const filePath = generateFile(language, code);
    let allPassed = true;
    let results = [];

    for (const [index, testCase] of data.TestCases.entries()) { // Iterate with index
      const testCaseInputPath = await generateInputFile(testCase.input);
      const testCaseOutput = await executeCode(language, filePath, testCaseInputPath);
      const passed = testCaseOutput.trim() === testCase.expectedOutput.trim();
      
      results.push({ testCase: `TestCase ${index + 1}`, passed, output: testCaseOutput.trim() });

      if (!passed) {
        allPassed = false;
        break;
      }
    }

    const verdict = allPassed ? 'Accepted' : 'Wrong Answer';
    res.status(200).json({ success: true, verdict, results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error: " + error.message });
  }
});

app.post('/Contestsubmit/:id', async (req, res) => { // Modified to get the 'id' parameter from the URL
  const { language, code } = req.body;
  const { id } = req.params; // Get the 'id' parameter from the request URL

  if (code === undefined) {
    return res.status(400).json({ success: false, message: 'Code is required' });
  }

  try {
    const { data } = await axios.get(`http://localhost:8000/allContestProblembyId/${id}`);
    const filePath = await generateFile(language, code);
    let allPassed = true;
    let results = [];

    for (const [index, testCase] of data.testCases.entries()) { // Iterate with index
      const testCaseInputPath = await generateInputFile(testCase.input);
      const testCaseOutput = await executeCode(language, filePath, testCaseInputPath);
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
    res.status(500).json({ success: false, message: "Error: " + error.message });
  }
});*/

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
