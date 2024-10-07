import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import axios from 'axios';
import { useParams , Link} from 'react-router-dom';
import Lang_selector from '../Components/Lang_selector.jsx';
import DOMPurify from 'dompurify';
import { useAuth } from '../AuthContext.jsx';

const Contesteditor = () => {
  const { id } = useParams();
  const [code, setCode] = useState(`#include <iostream>

  // Define the main function
  int main() { 
      // Output "Hello World!" to the console
      std::cout << "Hello World!"; 
      
      // Return 0 to indicate successful execution
      return 0; 
  }`);
  const {role, user} = useAuth();
  const [language, setLanguage] = useState('cpp');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testCases, setTestCases] = useState([]);
  const [verdict, setVerdict] = useState('');
  const [testCaseResults, setTestCaseResults] = useState([]); // New state for test case results
  const [submissionCount, setSubmissionCount] = useState(0);

  const boilerplateCode = {
    cpp: `#include <iostream>

  // Define the main function
  int main() { 
      // Output "Hello World!" to the console
      std::cout << "Hello World!"; 
      
      // Return 0 to indicate successful execution
      return 0; 
  }`,
    java: `public class Main {
      public static void main(String[] args) {
          // Output "Hello World!" to the console
          System.out.println("Hello World!");
      }
  }`,
    py: `def main():
      # Output "Hello World!" to the console
      print("Hello World!")
  
  if __name__ == "__main__":
      main()`
  };

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await axios.get(`https://online-judge-qmoq.onrender.com/code/get/${id}`);
        if (response.data.code) {
          setCode(response.data.code);
        } else {
          setCode(boilerplateCode[language]);
        }
      } catch (error) {
        console.error('Error fetching code', error);
      }
    };

    const fetchProblem = async () => {
      try {
        if (!id) {
          throw new Error('Problem ID is undefined');
        }
        const response = await axios.get(`https://online-judge-qmoq.onrender.com/allContestProblembyId/${id}`);
        const problemData = response.data;
        setProblem(problemData);
        setTestCases(response.data.testCases);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching problem', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchCode();
      fetchProblem();
    } else {
      setError('Problem ID is undefined');
      setLoading(false);
    }
  }, [id, language]);

  useEffect(() => {
    const saveCode = async () => {
      try {
        await axios.post('https://online-judge-qmoq.onrender.com/code/save', {
          id,
          code
        });
      } catch (error) {
        console.error('Error saving code', error);
      }
    };

    saveCode();
  }, [code, id]);

  const onSelect = (language) => {
    setLanguage(language);
    setCode(boilerplateCode[language]);
  };

  const handleRun = async () => {
    console.log('handleRun called');

    const payload = {
      language,
      code,
      input
    };

    try {
      const { data } = await axios.post(` https://compiler.codeuniverse.tech/run`, payload);
      console.log(data);
      setOutput(data.output1);
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleSubmission = async ()=>{
    const payload = {
      userId: user, // Assuming user object has an id field
      problemId: id,
      title: problem.title, // Assuming you have the title of the problem
      language,
      code,
      verdict: verdict || 'Pending',
      count: submissionCount
    };
    try {
      const { data } = await axios.post(`https://online-judge-qmoq.onrender.com/submission`, payload);
      console.log("Count:",data.count);
      setSubmissionCount(prevCount => prevCount + 1);
    } catch (error) {
      console.log("Error fetching submissionCount:",error.response);
    }
  }

  const handleSubmit = async () => {
    console.log('handleSubmit called');

    const payload = {
      userId: user, // Assuming user object has an id field
      problemId: id,
      language,
      code,
    };

    try {
      const { data } = await axios.post(`https://online-judge-qmoq.onrender.com/Contestsubmit`, payload);
      console.log(data);
      setVerdict(data.verdict);
      setTestCaseResults(data.results); // Set test case results
      await handleSubmission();
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`https://online-judge-qmoq.onrender.com/problem/${id}`);
      alert('Problem deleted successfully');
      navigate('/contest'); // Redirect to problems page after deletion
    } catch (error) {
      console.error('Error deleting problem:', error.response);
    }
  };

  if (loading) return <div className="flex items-center justify-center w-full h-[100vh] text-gray-900 dark:text-gray-100 dark:bg-gray-950"><div>
    <h1 className="text-xl md:text-7xl font-bold flex items-center">L<svg stroke="currentColor" fill="currentColor" stroke-width="0"
      viewBox="0 0 24 24" className="animate-spin" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z">
      </path>
    </svg> ading . . .</h1>
  </div></div>
  if (error) return <div>Error: {error}</div>;

  if (!problem) return <div>No problem data available.</div>;

  return (
    <div className='m-5 pt-12 p-3 h-[auto] border border-b-2 flex '>
      <div className="content pl-2 pr-2 mr-6 w-2/5 min-h-[70vh] h-[auto] border border-b-3">
        <h1 className="text-3xl">{problem.title}</h1>
        <p>Level: {problem.level}</p>
        <div className='text-2xl'>Description:</div><div
          className="description text-justify ml-2 mr-2"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(problem.description) }}
        />
        <br />
        <p ><h1 className='text-2xl'>Constraints:</h1> {problem.constraints}</p><br />
        <div className='text-2xl'>Examples:</div>
        {problem.examples.map((example, index) => (
          <div key={index} className='example mb-2'>
            <p><strong>Input:</strong> {example.inputExample}</p>
            <p><strong>Output:</strong> {example.outputExample}</p>
          </div>
        ))}
        <br />
        <p ><h1 className='text-2xl'>Topics:</h1> {problem.topics}</p>
      </div>
      
      <div className="editor h-[auto] w-3/5">
      {role === 'admin' && (
        <>
          <Link to={`/updateProb/${id}`}>
            <button className="bg-blue-500 min-h-10 hover:bg-blue-700 ml-[500px] text-white font-bold py-2 px-4 rounded">
              Update Problem
            </button>
          </Link>
          <button onClick={handleDelete} className="bg-red-500 min-h-10 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
            Delete Problem
          </button>
        </>
      )}
        <div className='flex justify-between'>
        <Lang_selector language={language} onSelect={onSelect} />
        <span>Submissions: {submissionCount}</span>
        </div>
        <Editor height="70vh" width='100%' theme='vs-dark' language={language} onChange={(value) => setCode(value)} value={code} />
        <div className='flex w-full'>
          <div className="in w-1/2 mt-4 p-3 min-h-44 border border-gray-300 rounded-lg flex flex-col space-y-2">
            <h2 className="text-lg font-semibold mb-2">Input</h2>
            <textarea rows='5' cols='10' value={input} placeholder='Input' onChange={(e) => setInput(e.target.value)}></textarea>
          </div>
          <div className="in-out ml-5 w-1/2 mt-4 p-3 min-h-44 border border-gray-300 rounded-lg flex flex-col space-y-2">
            <h2 className="text-lg font-semibold mb-2">Output</h2>
            <p>{output}</p>
            <p>Verdict: <span className={`ml-2 font-bold ${verdict === 'Accepted' ? 'text-green-600' : 'text-red-600'}`}>
              {verdict}
            </span> </p>
            <div>
              {testCaseResults.map((result, index) => (
                <p key={index}>
                <span className={`text-white ${result.passed?  'bg-green-500' : 'bg-red-500'}`}>
                {result.testCase}: {result.passed ? 'Passed' : 'Failed'} (Output: {result.output})
                </span>           
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="buttons flex mt-6 justify-center space-x-8">
          <button onClick={handleRun} className='run-button w-[150px] bg-green-800 h-[50px] mt-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]'>Run</button>
          <button onClick={handleSubmit} className='submit-button w-[150px] bg-red-600 h-[50px] mt-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#a42f09] before:to-[rgb(238,76,58)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]'>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Contesteditor;
