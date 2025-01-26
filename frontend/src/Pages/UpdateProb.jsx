import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProb = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState({
    title: '',
    description: '',
    level: '',
    examples: [],
    constraints: '',
    TestCases: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/problem/${id}`);
        setProblem(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching problem', error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchProblem();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProblem((prevProblem) => ({
      ...prevProblem,
      [name]: value,
    }));
  };

  const handleExampleChange = (index, field, value) => {
    const updatedExamples = [...problem.examples];
    updatedExamples[index][field] = value;
    setProblem((prevProblem) => ({
      ...prevProblem,
      examples: updatedExamples,
    }));
  };

  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = [...problem.TestCases];
    updatedTestCases[index][field] = value;
    setProblem((prevProblem) => ({
      ...prevProblem,
      TestCases: updatedTestCases,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`http://localhost:8000/problem/${id}`, problem);
      console.log('Problem updated:', data);
      alert('Problem updated successfully');
      navigate('/problems');
    } catch (error) {
      console.error('Error updating problem:', error.response);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen">Error: {error}</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white mt-3 p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-2xl font-bold mt-8 mb-6">Update Problem</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={problem.title}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={problem.description}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Level</label>
            <input
              type="text"
              name="level"
              value={problem.level}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Constraints</label>
            <textarea
              name="constraints"
              value={problem.constraints}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Examples</label>
            {problem.examples.map((example, index) => (
              <div key={index} className="example-group space-y-2">
                <label className="block text-sm font-medium text-gray-700">Input Example {index + 1}</label>
                <textarea
                  name={`inputExample${index}`}
                  value={example.inputExample}
                  onChange={(e) => handleExampleChange(index, 'inputExample', e.target.value)}
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <label className="block text-sm font-medium text-gray-700">Output Example {index + 1}</label>
                <textarea
                  name={`outputExample${index}`}
                  value={example.outputExample}
                  onChange={(e) => handleExampleChange(index, 'outputExample', e.target.value)}
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            ))}
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Test Cases</label>
            {problem.TestCases.map((testCase, index) => (
              <div key={index} className="testcase-group space-y-2">
                <label className="block text-sm font-medium text-gray-700">Input {index + 1}</label>
                <textarea
                  name={`input${index}`}
                  value={testCase.input}
                  onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <label className="block text-sm font-medium text-gray-700">Expected Output {index + 1}</label>
                <textarea
                  name={`expectedOutput${index}`}
                  value={testCase.expectedOutput}
                  onChange={(e) => handleTestCaseChange(index, 'expectedOutput', e.target.value)}
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Problem
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProb;
