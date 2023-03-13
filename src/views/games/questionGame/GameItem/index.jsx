import React from 'react';
import {
  CAccordionBody, CAccordionHeader, CAccordionItem, CImage,
} from '@coreui/react';
import '../../style.css';

const GameItem = ({
  question, handleDeleteQuestion, handleOpenEditModal,
}) => {
  return (
    <div className="mb-3">
      <CAccordionItem itemKey={Math.random()} className="questions-item">
        <CAccordionHeader>
          <span>
            Question №
            {question.id}
          </span>
        </CAccordionHeader>
        <CAccordionBody>
          <ul>
            {
              question.question.map((item) => (
                <li key={Math.random()}>
                  {item.question}
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
              {question.visible ? 'Yes' : 'No'}
            </span>
            <span>
              Premium:
              {' '}
              {question.ispremium ? 'Yes' : 'No'}
            </span>
            <span>
              Category:
              {' '}
              {question.category}
            </span>
          </div>
          <div className="clearfix">{question.question[0].images?.map((img, ind) => (<CImage align="start" rounded src={img} key={ind} style={{ marginRight: '10px' }} width={200} height={200} />))}</div>
          <div className="questions-item-buttons">
            <button onClick={() => handleDeleteQuestion(question.id)} type="button" className="btn btn-danger">Delete</button>
            <button onClick={() => handleOpenEditModal(question.id)} type="button" className="btn btn-warning">Edit</button>
          </div>
        </CAccordionBody>
      </CAccordionItem>
    </div>
  );
};

export default GameItem;
