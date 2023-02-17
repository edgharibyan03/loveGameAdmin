import {
  CAccordionBody, CAccordionHeader, CAccordionItem, CImage,
} from '@coreui/react';
import React from 'react';

const GameItem = ({ question }) => (
  <div className="mb-3">
    {
      question?.map((el) => (
        <CAccordionItem itemKey={Math.random()}>
          <CAccordionHeader>
            {el.question}
            {' '}
            -
            {' '}
            {el.language.toUpperCase()}
          </CAccordionHeader>
          <CAccordionBody>
            <div className="clearfix">{el.images?.map((img, ind) => (<CImage align="start" rounded src={img} key={ind} style={{ marginRight: '10px' }} width={200} height={200} />))}</div>
          </CAccordionBody>
        </CAccordionItem>
      ))
    }
  </div>
  // <div className='mb-3'>
  //   {question?.map((el, ind)=>{
  //     return  <div className="" key={ind}>
  //     <p>{el.question} {el.language}</p>
  //       <div className='clearfix'>{el.images?.map((img, ind) => (<CImage align="start" rounded src={img} key={ind} width={200} height={200} />))}</div>
  //    </div>
  //   })}
  // </div>

);

export default GameItem;
