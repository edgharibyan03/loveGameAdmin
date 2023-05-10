import React, { useEffect } from 'react';
import {
  CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem,
} from '@coreui/react';
import { useSelector } from 'react-redux';
import { getReportsInfo } from 'src/store/Slices/users';

export default function Reports() {
  const reports = useSelector(getReportsInfo)

  return (
    <CAccordion activeItemKey={1}>
      <CAccordionItem itemKey={1}>
        <CAccordionHeader>Accordion Item #1</CAccordionHeader>
        <CAccordionBody />
      </CAccordionItem>
    </CAccordion>
  )
}
