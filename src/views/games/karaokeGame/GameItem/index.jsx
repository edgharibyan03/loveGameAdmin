import { CAccordionBody, CAccordionHeader, CAccordionItem } from '@coreui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import '../../style.css';

const GameItem = ({
  name, language, link, id, handleDeleteKaraoke, handleOpenEditModal,
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
      {/* <div className="clearfix">{question.question[0].images?.map((img, ind) => (<CImage align="start" rounded src={img} key={ind} style={{ marginRight: '10px' }} width={200} height={200} />))}</div> */}
      <div className="questions-item-buttons">
        {/* <button type="button" className="btn btn-primary" data-coreui-toggle="modal" data-coreui-target="#exampleModal">
          Launch demo modal
        </button> */}
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
