import { CAccordionBody, CAccordionHeader, CAccordionItem } from '@coreui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import '../../style.css';

const GameItem = ({
  name, language, link, id, handleDeleteKaraoke, handleOpenEditModal, karaoke,
}) => (
  <CAccordionItem itemKey={Math.random()} className="questions-item">
    <CAccordionHeader>
      <span>
        Karaoke №
        {id}
      </span>
    </CAccordionHeader>
    <CAccordionBody>
      <span>
        {`${name} - ${language} - `}
        {' '}
        <Link target="_blank" to={link}>
          {link}
        </Link>
      </span>
      <div className="choice-game-item-info">
        <span>
          Visible:
          {' '}
          {karaoke.visible ? 'Yes' : 'No'}
        </span>
        <span>
          Premium:
          {' '}
          {karaoke.ispremium ? 'Yes' : 'No'}
        </span>
        <span>
          Category:
          {' '}
          {karaoke.category}
        </span>
      </div>
      <div className="questions-item-buttons">
        <button onClick={() => handleDeleteKaraoke(id)} type="button" className="btn btn-danger">Delete</button>
        <button onClick={() => handleOpenEditModal(id)} type="button" className="btn btn-warning">Edit</button>
      </div>
    </CAccordionBody>
  </CAccordionItem>
  // <div className="mb-3">
  //   <div className="d-flex flex-column">
  //     <span>{name}</span>
  //     <span>{language}</span>
  //     <a target="_blank" href={link} rel="noreferrer">{link}</a>
  //   </div>
  // </div>
);

export default GameItem;
