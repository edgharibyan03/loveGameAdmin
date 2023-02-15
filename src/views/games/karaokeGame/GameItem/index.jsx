import { CImage } from '@coreui/react';
import React, { useState } from 'react';

const GameItem = ({name, language, link}) => {
  
  return (
    <div className="mb-3">
      <div className='d-flex flex-column'>
        <span>{name}</span>
        <span>{language}</span>
        <a target='_blank' href={link}>{link}</a>
      </div>
    </div>
  );
};

export default GameItem;
