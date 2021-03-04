import { Routes, Route, Navigate } from 'react-router';
import { Link } from 'react-router-dom';

import { Board } from './board';
import { Rasks } from './rasks';

export const ProjectDetail = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to="board">board</Link>
      <br />
      <Link to="rasks">rasks</Link>
      <Routes>
        <Route path="/board" element={<Board />}></Route>
        <Route path="/rasks" element={<Rasks />}></Route>
        <Navigate to={window.location.pathname + '/board'} />
      </Routes>
    </div>
  );
};
