import React from 'react';
import './Error.css';

const Error = ({ children }) => {
  return (
    <div className='error-container'>
      <div className='error-icon'>❌</div>
      <div className='error-message'>{children}</div>
    </div>
  );
};

export default Error;
