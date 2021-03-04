import { Routes, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { useChangeTitle } from 'helper';

import { Board } from './board';
import { Rasks } from './rasks';

export const ProjectDetail = () => {
  useChangeTitle('项目详情');
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to="board">board</Link>
      <br />
      <Link to="rasks">rasks</Link>
      <Routes>
        <Route path="/board" element={<Board />}></Route>
        <Route path="/rasks" element={<Rasks />}></Route>
      </Routes>
    </div>
  );
};
