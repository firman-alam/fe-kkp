import React from 'react';

const Total = ({ title, icon, total, footer, onClick }) => {
  return (
    <article className='total__comp'>
      <div className='total__title'>
        <h3>Total {title}</h3>
      </div>
      <div className='total__body'>
        <p>Rp.{total}</p>
      </div>
      <div
        className='total__footer'
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      >
        {footer}
        {icon}
      </div>
    </article>
  );
};

export default Total;
