import { CAccordionBody, CAccordionHeader, CAccordionItem } from '@coreui/react';
import React from 'react';

export default function GiftItem({ gift, handleDeleteGift, handleOpenEditModal }) {
  console.log(gift, '2');
  return (
    <CAccordionItem itemKey={Math.random()} className="questions-item">
      <CAccordionHeader>
        <span>
          Gift №
          {gift.id}
        </span>
      </CAccordionHeader>
      <CAccordionBody className="questions-item-body">
        <ul>
          <li>
            Gift title:
            {' '}
            {gift.title}
          </li>
          <li>
            Gift diamond price:
            {' '}
            {gift.dimondPrice}
          </li>
          <li>
            Gift gold price:
            {' '}
            {gift.goldPrice}
          </li>
          <li>
            Level:
            {' '}
            {gift.level}
          </li>
          <li>
            Category:
            {' '}
            {gift?.category?.category?.title}
          </li>
          <li>
            Time:
            {' '}
            {gift.time}
          </li>
          <li>
            Position:
            {' '}
            {gift?.position?.fixedPosition || gift?.position}
          </li>
          <li>
            Is premium:
            {' '}
            {gift.ispremium ? 'Yes' : 'No'}
          </li>
          <li>
            Is visible:
            {' '}
            {gift.visible ? 'Yes' : 'No'}
          </li>
          <img className="questions-item-body-img" src={gift.path} alt="gift-img" />
        </ul>
        {/* <ul>
          {
            action.map((item) => (
              <li key={Math.random()}>
                {item.title}
                {' '}
                -
                {' '}
                {item.language}
              </li>
            ))
          }
        </ul> */}
        <div className="questions-item-buttons">
          <button onClick={() => handleDeleteGift(gift.id)} type="button" className="btn btn-danger">Delete</button>
          <button onClick={() => handleOpenEditModal(gift.id)} type="button" className="btn btn-warning">Edit</button>
        </div>
      </CAccordionBody>
    </CAccordionItem>
  );
}
