import React from 'react';

const GameItem = ({ name, language, link }) => (
  <div className="mb-3">
    <div className="d-flex flex-column">
      <span>{name}</span>
      <span>{language}</span>
      <a target="_blank" href={link} rel="noreferrer">{link}</a>
    </div>
  </div>
);

export default GameItem;
