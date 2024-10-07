import React from 'react';

const topics = [
  "Arrays",
  "Linked Lists",
  "Stacks",
  "Queues",
  "Trees",
  "Graphs",
  "Hashing",
  "Sorting",
  "Searching",
  "Dynamic Programming",
  "Greedy Algorithms",
  "Backtracking"
];

const Topics = () => {
  return (
    <div className="topics bg-gradient-to-tr from-blue-300 to-slate-500 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Key DSA Topics to Explore:</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-gradient-to-br from-purple-300 to-purple-500 transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-800 text-center">{topic}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topics;
