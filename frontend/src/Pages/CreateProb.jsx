import React, { useState } from 'react';
import axios from 'axios';

const CreateProb = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: '',
    examples: [{ inputExample: '', outputExample: '' }],
    constraints: '',
    TestCases: [{ input: '', expectedOutput: '' }]
  });

  const [TestCases, setTestCases] = useState([{ input: '', expectedOutput: '' }]);
  const [examples, setExamples] = useState([{ inputExample: '', outputExample: '' }]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = [...TestCases];
    newTestCases[index][field] = value;
    setTestCases(newTestCases);
  };
  const handleExampleChange = (index, field, value) => {
    const newExamples = [...examples];
    newExamples[index][field] = value;
    setExamples(newExamples);
  };

  const addTestCase = () => {
    setTestCases([...TestCases, { input: '', expectedOutput: '' }]);
  };
  const addExample = () => {
    setExamples([...examples, { inputExapmle: '', outputExample: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData,examples, TestCases };
      const response = await axios.post('https://online-judge-qmoq.onrender.com/problem', payload);
      console.log('Problem created:', response.data);
      alert('Problem created successfully');
      // Clear the form
      setFormData({
        title: '',
        description: '',
        category: '',
        level: '',
        examples: [{ inputExample: '', outputExample: '' }],
        constraints: '',
        TestCases: [{ input: '', expectedOutput: '' }]
      });
      setTestCases([{ input: '', expectedOutput: '' }])
      setExamples([{ inputExample: '', outputExample: '' }])
    } catch (error) {
      console.error('Error creating problem:', error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl mt-14 underline text-amber-900 font-bold mb-6">Create a Problem</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Level</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option value="" disabled>Select level</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Constraints</label>
          <textarea
            name="constraints"
            value={formData.constraints}
            onChange={handleChange}
            rows="2"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Examples</label>
          {examples.map((example, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder="InputExample"
                className="w-full p-2 mb-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={example.inputExample}
                onChange={(e) => handleExampleChange(index, 'inputExample', e.target.value)}
              />
              <input
                type="text"
                placeholder="OutputExample"
                className="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={example.outputExample}
                onChange={(e) => handleExampleChange(index, 'outputExample', e.target.value)}
              />
            </div>
          ))}
          <button type="button" className="bg-blue-500 text-white p-2 rounded" onClick={addExample}>
            Add Example
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Test Cases</label>
          {TestCases.map((testCase, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder="Input"
                className="w-full p-2 mb-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={testCase.input}
                onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
              />
              <input
                type="text"
                placeholder="Expected Output"
                className="w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={testCase.expectedOutput}
                onChange={(e) => handleTestCaseChange(index, 'expectedOutput', e.target.value)}
              />
            </div>
          ))}
          <button type="button" className="bg-blue-500 text-white p-2 rounded" onClick={addTestCase}>
            Add Test Case
          </button>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Problem
        </button>
      </form>
    </div>
  );
};

export default CreateProb;
