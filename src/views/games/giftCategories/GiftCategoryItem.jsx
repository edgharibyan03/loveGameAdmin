import { CAccordionBody, CAccordionHeader, CAccordionItem } from '@coreui/react';
import React from 'react';

export default function GiftCategoryItem({
  title, handleOpenEditModal, handleDeleteGift, id, language,
}) {
  return (
    <CAccordionItem itemKey={Math.random()} className="questions-item gift-category">
      <CAccordionHeader>
        <span>
          Gift category №
          {id}
        </span>
      </CAccordionHeader>
      <CAccordionBody className="gift-category-item questions-item-body">
        <span>
          Title:
          {' '}
          {title}
        </span>
        <span>
          Language:
          {' '}
          {language}
        </span>
        <div className="questions-item-buttons">
          <button onClick={() => handleDeleteGift(id)} type="button" className="btn btn-danger">Delete</button>
          <button onClick={() => handleOpenEditModal(id)} type="button" className="btn btn-warning">Edit</button>
        </div>
      </CAccordionBody>
    </CAccordionItem>
  );
}
