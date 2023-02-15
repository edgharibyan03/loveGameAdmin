import { CImage } from '@coreui/react';
import React, { useState } from 'react';

const GameItem = ({question}) => {
  
  return (
    <div className='mb-3'>
      {question?.map((el, ind)=>{
        return  <div className="" key={ind}>
        <p>{el.question} {el.language}</p>
        <div className='clearfix'>{el.images?.map((img, ind)=>( <CImage align="start" rounded src={img.src} key={ind} width={200} height={200} />))}</div>
       </div>
      })}
    </div>
   
  );
};

export default GameItem;
