import React from 'react';
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='text-white bg-gray-600 flex justify-center items-center py-4'>
        <span className="mr-1"><FaRegCopyright /></span>
      <h1 className='text-center'>
        2024 DSA Problems by CodeVerse. All rights reserved. Made By Satyam Sharma
      </h1>
    </div>
  );
};

export default Footer;
