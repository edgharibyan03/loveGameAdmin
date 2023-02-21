import React, {
  useEffect, useCallback, useState, useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  CAccordion,
  CButton, CContainer, CRow,
} from '@coreui/react';
import {
  deleteGift, editGift, getGifts, getLoading,
} from 'src/store/Slices/gifts';
import { useAppDispatch } from 'src/store';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { getPaginationIndex } from 'src/store/Slices/games';
import { CircularProgress } from '@mui/material';
import { toastDeleteBody } from 'src/utils/toast';
import GiftItem from './GiftItem';
import EditGift from './EditGame';
import '../style.css'

function Gifts() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const gifts = useSelector((state) => state.gifts.gifts);
  const paginationIndex = useSelector(getPaginationIndex);
  const loading = useSelector(getLoading)

  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentGiftId, setCurrentGiftId] = useState(null);

  const levelInputRef = useRef(null);
  const categoryInputRef = useRef(null);
  const goldPriceInputRef = useRef(null);
  const diamondPriceInputRef = useRef(null);
  const isPremiumPriceInputRef = useRef(null);
  const visiblePriceInputRef = useRef(null);
  const imageInputRef = useRef(null)

  const handleClick = useCallback(() => {
    navigate('/gifts/add-gift');
  }, []);

  const handleOpenEditModal = useCallback((id) => {
    setCurrentGiftId(id);
    setOpenEditModal(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setOpenEditModal(false);
  }, []);

  const handleDeleteGift = useCallback((id) => {
    toast.promise(
      dispatch(deleteGift(id)),
      toastDeleteBody('gift'),
    )
  }, []);

  const handleCloseEditModalAndUpdate = useCallback(() => {
    const currentGift = gifts.find((item) => item.id === currentGiftId);

    const level = levelInputRef.current.value;
    const category = categoryInputRef.current.value;
    const goldPrice = goldPriceInputRef.current.value;
    const dimondPrice = diamondPriceInputRef.current.value;
    const ispremium = isPremiumPriceInputRef.current.checked;
    const visible = visiblePriceInputRef.current.checked;
    const image = imageInputRef.current.files[0] || currentGift.path;

    toast.promise(
      dispatch(editGift({
        level,
        category,
        goldPrice,
        dimondPrice,
        ispremium,
        visible,
        image,
        id: currentGiftId,
      })),
      {
        pending: 'The gift is changing',
        success: {
          render() {
            setOpenEditModal(false);
            return 'The gift was changed';
          },
        },
        error: 'Failed to change gift',
      },
    )
  }, [
    levelInputRef,
    categoryInputRef,
    goldPriceInputRef,
    diamondPriceInputRef,
    isPremiumPriceInputRef,
    visiblePriceInputRef,
    imageInputRef,
    currentGiftId,
  ]);

  useEffect(() => {
    dispatch(getGifts(`?skip=${paginationIndex * 10}&take=10`));
  }, [paginationIndex]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {loading ? <CircularProgress /> : (
        <CContainer>
        <CRow className="clearfix mb-3">
          <CAccordion activeItemKey={2}>
              {_.sortBy(
                gifts.giftList,
                'id',
              )?.map((item) => (
              <GiftItem
                key={item.id}
                gift={item}
                handleDeleteGift={handleDeleteGift}
                handleOpenEditModal={handleOpenEditModal}
              />
              ))}
          </CAccordion>

        </CRow>
        <CButton color="info text-white" onClick={handleClick}>Add Gifts</CButton>
        </CContainer>
      )}
      <EditGift
        open={openEditModal}
        gift={gifts.giftList.find((item) => item.id === currentGiftId)}
        levelInputRef={levelInputRef}
        categoryInputRef={categoryInputRef}
        goldPriceInputRef={goldPriceInputRef}
        diamondPriceInputRef={diamondPriceInputRef}
        isPremiumCheckbox={isPremiumPriceInputRef}
        isVisibleCheckbox={visiblePriceInputRef}
        imageInputRef={imageInputRef}
        handleClose={handleCloseEditModal}
        handleCloseAndUpdate={handleCloseEditModalAndUpdate}
      />
    </div>
  );
}

export default Gifts;
