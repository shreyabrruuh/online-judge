import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import './Problems.css';
import cardImg from '../assets/card-img.jpeg'
import { useAuth } from '../AuthContext';


const Problems = () => {
  const [problemsByCategory, setProblemsByCategory] = useState({});
  const {role}=useAuth();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get('https://online-judge-qmoq.onrender.com/problem');
        const problems = response.data;

        const categorizedProblems = problems.reduce((acc, problem) => {
          if (!acc[problem.category]) {
            acc[problem.category] = [];
          }
          acc[problem.category].push(problem);
          return acc;
        }, {});

        setProblemsByCategory(categorizedProblems);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProblems();
  }, []);

  return (
    <div className='main-container mt-4 pt-8 pb-5  h-[auto] bg-gradient-to-br from-slate-800 to-black'>
      {role==='admin' &&(
      <button className="bg-sky-700 mt-5 text-white ml-[1300px]  font-extrabold p-2 px-6 rounded-xl hover:bg-sky-500 transition-colors">
        <Link to='/createProb'>Create Problem</Link>
      </button>
)}
      {Object.keys(problemsByCategory).map((category) => (
        <div key={category} className="category-section mx-12 my-8">
          <h1 className="text-3xl text-white pt-3 mb-4">{category}</h1>
          <div className="problems-row flex flex-wrap gap-10">
            {problemsByCategory[category].map((problem) => (
              <div key={problem._id} className="ar-p w-60 min-h-80 h-auto bg-gray-700 rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 hover:bg-gray-900 hover:shadow-2xl hover:shadow-sky-400 transition-shadow">
                <div  className="cardImg w-52 h-40 rounded-2xl"><img className='w-52 h-40 rounded-2xl' src={cardImg} alt="CardImg" /></div>
                <div>
                  <p className="font-extrabold">{problem.title}</p>
                  <p className="">Level: {problem.level}</p>
                </div>
                <button className="bg-sky-700 font-extrabold p-2 px-6 rounded-xl hover:bg-sky-500 transition-colors">
                  <Link to={`/editor/${problem._id}`}>Solve</Link>
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Problems;
