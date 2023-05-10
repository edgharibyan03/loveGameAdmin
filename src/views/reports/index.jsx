import React, {
  useEffect, useState, useRef, useCallback,
} from 'react';
import {
  CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem, CButton, CFormCheck,
} from '@coreui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { changePaginationIndex, getPaginationIndex } from 'src/store/Slices/games';
import { getReports, getReportsInfo, setReportViewed } from 'src/store/Slices/users';
import './style.scss';
import { Button } from '@coreui/coreui';
import { CircularProgress } from '@mui/material';

const qs = require('querystringify');

export default function Reports() {
  const dispatch = useDispatch();

  const reports = useSelector(getReportsInfo);

  const paginationIndex = useSelector(getPaginationIndex);

  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState(null);

  const timeoutRef = useRef(null);

  const handleGetReports = useCallback((data) => {
    const searchObj = Object.fromEntries([...searchParams]);
    const filterObj = {
      viewed: false,
      ...searchObj,
      ...data,
      skip: (paginationIndex || 0) * 10,
      take: 10,
    };

    setData(filterObj);

    setSearchParams(filterObj);
    const filterStringify = qs.stringify(filterObj, true);
    dispatch(getReports(filterStringify));
  }, [paginationIndex, searchParams]);

  const handleSetViewed = useCallback((id) => {
    dispatch(setReportViewed({ id, cb: () => handleGetReports() }));
  }, []);

  useEffect(() => {
    handleGetReports(0);
  }, [paginationIndex]);

  useEffect(() => {
    dispatch(changePaginationIndex(0));
  }, []);

  console.log(data, 'reports33');

  return (
    <div className="reports">
      <div className="reports-filters">
        <CFormCheck
          id="flexCheckDefault"
          label="Просмотренные"
          value={data?.viewed}
          checked={data?.viewed}
          onChange={(e) => {
            handleGetReports({ viewed: e.target.checked });
          }}
        />
      </div>
      {reports.status === 'loading' ? <CircularProgress /> : (
        <CAccordion>
          {reports.list.reportList?.map((item, index) => (
            <CAccordionItem key={item.id} itemKey={index}>
              <CAccordionHeader>
                Жалоба от
                {' '}
                {item.sender.firstName}
                {' '}
                {item.sender.lastName}
                {' '}
                на игрока
                {' '}
                {item.receiver.firstName}
                {' '}
                {item.receiver.lastName}
              </CAccordionHeader>
              <CAccordionBody className="reports-body">
                <span className="reports-item-text">
                  Жалоба:
                  {' '}
                  <b>{item.descrription}</b>
                </span>
                <span className="reports-item-text">
                  Отправлено:
                  {' '}
                  {dayjs(item.createdAt).format('dddd, MMMM D, YYYY HH:mm')}
                </span>
                <span className="reports-item-text">
                  Отправлено от игрока №
                  <b>{item.sender.id}</b>
                  {' '}
                  {item.sender.firstName}
                  {' '}
                  {item.sender.lastName}
                </span>
                <span className="reports-item-text">
                  Получатель игрок №
                  <b>{item.receiver.id}</b>
                  {' '}
                  {item.receiver.firstName}
                  {' '}
                  {item.receiver.lastName}
                </span>
                <span className="reports-item-text">
                  Статус:
                  {' '}
                  <b>{item.viewed ? 'Просмотренно' : 'Не просмотренно'}</b>
                </span>
                <CButton style={{ width: '200px' }} color="info text-white" onClick={() => handleSetViewed(item.id)}>Просмотренно</CButton>
              </CAccordionBody>
            </CAccordionItem>
          ))}
        </CAccordion>
      )}
    </div>
  );
}
