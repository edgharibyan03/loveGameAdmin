import { CAccordionBody, CAccordionHeader, CAccordionItem } from '@coreui/react';
import React from 'react';

export default function GiftCategoryItem({
  title, handleOpenEditModal, handleDeleteGift, id,
}) {
  return (
    <CAccordionItem itemKey={Math.random()} className="questions-item">
      <CAccordionHeader>
        <span>
          Gift category №
          {id}
        </span>
      </CAccordionHeader>
      <CAccordionBody className="questions-item-body">
        {title}
        <div className="questions-item-buttons">
          <button onClick={() => handleDeleteGift(id)} type="button" className="btn btn-danger">Delete</button>
          <button onClick={() => handleOpenEditModal(id)} type="button" className="btn btn-warning">Edit</button>
        </div>
      </CAccordionBody>
    </CAccordionItem>
  );
}
