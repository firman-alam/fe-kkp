import React, { useEffect, useState } from 'react';

const Clock = () => {
  const [clock, setClock] = useState();

  useEffect(() => {
    setInterval(() => {
      const date = new Date().toLocaleString();
      setClock(date);
    }, 1000);
  }, []);
  return <div>{clock}</div>;
};

export default Clock;
