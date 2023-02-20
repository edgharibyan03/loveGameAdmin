import React, {
  useEffect, useCallback, useState, useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  CAccordion,
  CButton, CContainer, CRow,
} from '@coreui/react';
import { deleteGift, editGift, getGifts } from 'src/store/Slices/gifts';
import { useAppDispatch } from 'src/store';
import GiftItem from './GiftItem';
import EditGift from './EditGame';
import '../style.css'

function Gifts() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const gifts = useSelector((state) => state.gifts.gifts);

  const [paginationIndex, setPaginationIndex] = useState(0);
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
    // setCurrentAction(games.find((item) => item.id === id));
    setOpenEditModal(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setOpenEditModal(false);
  }, []);

  const handleDeleteGift = useCallback((id) => {
    dispatch(deleteGift(id));
  }, []);

  const handleCloseEditModalAndUpdate = useCallback(() => {
    const level = levelInputRef.current.value;
    const category = categoryInputRef.current.value;
    const goldPrice = goldPriceInputRef.current.value;
    const dimondPrice = diamondPriceInputRef.current.value;
    const ispremium = isPremiumPriceInputRef.current.checked;
    const visible = visiblePriceInputRef.current.checked;
    const image = imageInputRef.current.files[0];

    console.log(image, level, category, goldPrice, dimondPrice, ispremium, visible);

    dispatch(editGift({
      level,
      category,
      goldPrice,
      dimondPrice,
      ispremium,
      visible,
      image,
      current,
    }));
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
    dispatch(getGifts());
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <CContainer>
        <CRow className="clearfix mb-3">
          <CAccordion activeItemKey={2}>
            {gifts?.map((item) => (
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
      <EditGift
        open={openEditModal}
        gift={gifts.find((item) => item.id === currentGiftId)}
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
