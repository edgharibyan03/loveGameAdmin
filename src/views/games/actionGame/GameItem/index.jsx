import React from 'react';
import { CAccordionBody, CAccordionHeader, CAccordionItem } from '@coreui/react';
import '../../style.css';

const GameItem = ({
  action, id, deleteGame, handleOpenEditModal,
}) => {
  console.log(action, 'action');
  return (
    <CAccordionItem itemKey={Math.random()} className="questions-item">
      <CAccordionHeader>
        <span>
          Action game №
          {id}
        </span>
      </CAccordionHeader>
      <CAccordionBody>
        <ul>
          {
            action.action?.map((item) => (
              <li key={Math.random()}>
                {item.title}
                {' '}
                -
                {' '}
                {item.language}
              </li>
            ))
          }
        </ul>
        <div className="choice-game-item-info">
          <span>
            Visible:
            {' '}
            {action.visible ? 'Yes' : 'No'}
          </span>
          <span>
            Premium:
            {' '}
            {action.ispremium ? 'Yes' : 'No'}
          </span>
          <span>
            Category:
            {' '}
            {action.category}
          </span>
        </div>
        <div className="questions-item-buttons">
          <button onClick={() => deleteGame(id)} type="button" className="btn btn-danger">Delete</button>
          <button onClick={() => handleOpenEditModal(id)} type="button" className="btn btn-warning">Edit</button>
        </div>
      </CAccordionBody>
    </CAccordionItem>
  );
};

export default GameItem;
