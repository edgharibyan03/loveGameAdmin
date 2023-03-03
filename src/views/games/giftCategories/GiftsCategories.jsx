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
  deleteGiftCategory, getGiftsCategories, getLoading, editGiftCategory,
} from 'src/store/Slices/giftsCotegories';
import { useAppDispatch } from 'src/store';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { getPaginationIndex } from 'src/store/Slices/games';
import { CircularProgress } from '@mui/material';
import { toastDeleteBody } from 'src/utils/toast';
import GiftCategoryItem from './GiftCategoryItem';
// import EditGift from './EditGame';
import '../style.css'
import EditGiftCategory from './EditGiftCategory';
// eslint-disable-next-line import/order

function GiftsCategories() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const giftsCotegories = useSelector((state) => state.giftsCotegories.giftCategory);
  const paginationIndex = useSelector(getPaginationIndex);
  const loading = useSelector(getLoading)
  const textInputRef = useRef(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentGiftCategoryId, setcurrentGiftCategoryId] = useState(null);
  const handleClick = useCallback(() => {
    navigate('/gift-categories/add-gift-category');
  }, []);

  const handleOpenEditModal = useCallback((id) => {
    setcurrentGiftCategoryId(id);
    setOpenEditModal(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setOpenEditModal(false);
  }, []);

  const handleDeleteGift = useCallback((id) => {
    toast.promise(
      dispatch(deleteGiftCategory(id)),
      toastDeleteBody('gift'),
    )
  }, []);

  const handleCloseEditModalAndUpdate = useCallback(() => {
    const title = textInputRef.current.value;
    toast.promise(
      dispatch(editGiftCategory({
        title,
        id: currentGiftCategoryId,
      })),
      {
        pending: 'The category is changing',
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
    textInputRef,
    currentGiftCategoryId,
  ]);

  console.log(giftsCotegories, 'giftsCotegoriesgiftsCotegoriesgiftsCotegoriesgiftsCotegories');
  useEffect(() => {
    dispatch(getGiftsCategories(`?skip=${paginationIndex * 10}&take=10`));
  }, [paginationIndex]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {loading ? <CircularProgress /> : (
        <CContainer>
          <CRow className="clearfix mb-3">
            <CAccordion activeItemKey={2}>
              {_.sortBy(
                giftsCotegories.categoryList,
                'id',
              )?.map((item, index) => {
                console.log(item, 'item');
                return (
                  <GiftCategoryItem
                    key={index + 1}
                    id={item.id}
                    title={item.category?.title}
                    language={item.category?.language}
                    handleDeleteGift={handleDeleteGift}
                    handleOpenEditModal={handleOpenEditModal}
                  />
                );
              })}
            </CAccordion>

          </CRow>
          <CButton color="info text-white" onClick={handleClick}>Add Category</CButton>
        </CContainer>
      )}
       <EditGiftCategory
        open={openEditModal}
        category={giftsCotegories?.categoryList?.find((item) => item.id === currentGiftCategoryId)}
        textInputRef={textInputRef}
        handleClose={handleCloseEditModal}
        handleCloseAndUpdate={handleCloseEditModalAndUpdate}
      />
    </div>
  );
}

export default GiftsCategories;
