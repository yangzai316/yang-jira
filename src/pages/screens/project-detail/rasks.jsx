import React, { useMemo } from 'react';
import styled from '@emotion/styled';

export const Rasks = () => {
  const time = useTime();
  return (
    <>
      <h1>
        {time.year}-{time.month}
      </h1>
      <div>
        {Array(time.date)
          .fill(1)
          .map((item, index) => {
            return <Day key={index}>{index + 1}</Day>;
          })}
      </div>
    </>
  );
};

const useTime = () => {
  const now = new Date();
  now.setMonth(now.getMonth() + 1);
  now.setDate(0);
  return useMemo(() => {
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      date: now.getDate(),
    };
    // eslint-disable-next-line 
  }, []);
};

const Day = styled.span`
  padding: 10px;
  font-size: 12px;
  border-bottom: 1px solid #ccc;
  position: relative;
  &::after {
    position: absolute;
    content: ' ';
    width: 8px;
    height: 8px;
    bottom: -4px;
    background-color: #ccc;
    border-radius: 50%;
    left: 38%;
    cursor: pointer;
  }
`;
