import React from 'react';
import { cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

const GameItem = ({ action, deleteGame }) => {
  console.log(action, 'action');
  return (
    <div className="mb-3 d-flex align-items-center justify-content-between game-item">
      <div>
        {action.length && action?.map((act, ind) => (
          <div key={ind} className="d-flex">
            <span>{act?.title}</span>
            {' '}
            -
            <span>{act?.language}</span>
          </div>
        ))}
      </div>
      <div><CIcon onClick={deleteGame} icon={cilTrash} size="l" /></div>
      {/* cilTrash */}
    </div>
  );
};

export default GameItem;
