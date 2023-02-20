import {
  CAccordionBody, CAccordionHeader, CAccordionItem, CImage,
} from '@coreui/react';
import React from 'react';
import '../../style.css';

const GameItem = ({ question, handleDeleteQuestion }) => (
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
              <li>
                {item.question}
                {' '}
                -
                {' '}
                {item.language}
              </li>
            ))
          }
        </ul>
        <div className="clearfix">{question.question[0].images?.map((img, ind) => (<CImage align="start" rounded src={img} key={ind} style={{ marginRight: '10px' }} width={200} height={200} />))}</div>
        <div className="questions-item-buttons">
          <button onClick={() => handleDeleteQuestion(question.id)} type="button" className="btn btn-danger">Delete</button>
          <button type="button" className="btn btn-warning">Edit</button>
        </div>
      </CAccordionBody>
    </CAccordionItem>
    {
      // question?.map((el) => (
      //   <CAccordionItem itemKey={Math.random()}>
      //     <CAccordionHeader>
      //       {el.question}
      //       {' '}
      //       -
      //       {' '}
      //       {el.language.toUpperCase()}
      //     </CAccordionHeader>
      //     <CAccordionBody>
      //       {/* <div className="clearfix">{el.images?.map((img, ind) => (<CImage align="start" rounded src={img} key={ind} style={{ marginRight: '10px' }} width={200} height={200} />))}</div> */}
      //     </CAccordionBody>
      //   </CAccordionItem>
      // ))
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
