import React from 'react';

const Terminal = ({ text }) => {
  return (
    <section className='terminal'>
      <div className='terminal-header'>
        <svg height='12' width='12' xmlns='http://www.w3.org/2000/svg'>
          <circle r='6' cx='6' cy='6' fill='red' />
        </svg>
        <svg
          height='12'
          width='12'
          xmlns='http://www.w3.org/2000/svg'
          style={{ marginLeft: '0.5rem' }}
        >
          <circle r='6' cx='6' cy='6' fill='yellow' />
        </svg>
        <svg
          height='12'
          width='12'
          xmlns='http://www.w3.org/2000/svg'
          style={{ marginLeft: '0.5rem' }}
        >
          <circle r='6' cx='6' cy='6' fill='green' />
        </svg>
      </div>
      <div className='terminal-body'>{text}</div>
    </section>
  );
};

export default Terminal;
