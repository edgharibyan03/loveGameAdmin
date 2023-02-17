import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  CButton, CContainer, CRow,
} from '@coreui/react';
import { getGifts } from 'src/store/Slices/gifts';
import { useAppDispatch } from 'src/store';
import GiftItem from './GiftItem';

function Gifts() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const gifts = useSelector((state) => state.gifts.gifts);

  const handleClick = useCallback(() => {
    navigate('/gifts/add-gift');
  }, []);

  // const deleteGame = useCallback((id) => {
  //   dispatch(deleteActionGame(id));
  // }, []);

  useEffect(() => {
    dispatch(getGifts());
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <CContainer>
        <CRow className="clearfix mb-3">
          <ol>
            {gifts?.map((item, index) => <GiftItem key={item.id} gift={item} index={index} />)}
          </ol>

        </CRow>
        <CButton color="info text-white" onClick={handleClick}>Add Gifts</CButton>

      </CContainer>
    </div>
  );
}

export default Gifts;
