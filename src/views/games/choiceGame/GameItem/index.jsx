import React from 'react';
import { CAccordionBody, CAccordionHeader, CAccordionItem } from '@coreui/react';
import '../../style.css';

const GameItem = ({
  choice, id, deleteGame, handleOpenEditModal,
}) => {
  console.log(choice, 'choic3231221e');
  return (
    <CAccordionItem itemKey={Math.random()} className="choice-game-item">
      <CAccordionHeader>
        <span>
          Choice game №
          {id}
        </span>
      </CAccordionHeader>
      <CAccordionBody>
        <ul>
          {
            choice?.chouse?.map((item) => (
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
            {choice.visible ? 'Yes' : 'No'}
          </span>
          <span>
            Premium:
            {' '}
            {choice.ispremium ? 'Yes' : 'No'}
          </span>
          <span>
            Category:
            {' '}
            {choice.category}
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
