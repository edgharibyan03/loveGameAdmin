import React, {
  useEffect, useCallback, useState, useRef,
} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import Filters from 'src/components/filters';
import { getPaginationIndex } from 'src/store/Slices/games';
import { CircularProgress } from '@mui/material';
import { toastDeleteBody } from 'src/utils/toast';
// eslint-disable-next-line import/no-named-as-default
import GiftItem from './GiftItem';
import EditGift from './EditGame';
import '../style.css'

const qs = require('querystringify');

function Gifts() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const gifts = useSelector((state) => state.gifts.gifts);
  const giftsCotegories = useSelector((state) => state.giftsCotegories.giftCategory);
  const paginationIndex = useSelector(getPaginationIndex);
  const loading = useSelector(getLoading)
  const [searchParams, setSearchParams] = useSearchParams();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentGiftId, setCurrentGiftId] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);

  const levelInputRef = useRef(null);
  const categoryInputRef = useRef(null);
  const goldPriceInputRef = useRef(null);
  const diamondPriceInputRef = useRef(null);
  const isPremiumPriceInputRef = useRef(null);
  const visiblePriceInputRef = useRef(null);
  const imageInputRef = useRef(null)
  const timeInputRef = useRef(null);
  const positionInputRef = useRef(null);
  const titleInputRef = useRef(null)

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

  const handleGetGifts = useCallback((data) => {
    const searchObj = Object.fromEntries([...searchParams]);
    setCurrentCategory(giftsCotegories?.categoryList?.find((item) => item.id === +(data?.category || searchObj.category)) || { id: 'null', category: { title: 'Не выбрано' } });
    const filterObj = {
      category: 'null',
      ispremium: 'true',
      visible: 'true',
      ...searchObj,
      ...data,
      skip: paginationIndex * 10,
      take: 10,
    }
    setSearchParams(filterObj);
    const filterStringify = qs.stringify(filterObj, true)
    dispatch(getGifts(filterStringify));
  }, [paginationIndex, giftsCotegories]);

  const handleCloseEditModalAndUpdate = useCallback(() => {
    const currentGift = gifts.giftList.find((item) => item.id === currentGiftId);

    const level = levelInputRef.current.value;
    const category = categoryInputRef.current.value;
    const goldPrice = goldPriceInputRef.current.value;
    const dimondPrice = diamondPriceInputRef.current.value;
    const ispremium = isPremiumPriceInputRef.current.checked;
    const visible = visiblePriceInputRef.current.checked;
    const image = imageInputRef.current.files[0] || currentGift.path;
    const title = titleInputRef.current.value;
    const position = positionInputRef.current.value;
    const time = timeInputRef.current.value || null;

    toast.promise(
      dispatch(editGift({
        level,
        category: giftsCotegories.categoryList.find((item) => +item.id === +category),
        goldPrice,
        dimondPrice,
        ispremium,
        visible,
        image,
        position,
        time,
        title,
        id: currentGiftId,
      })),
      {
        pending: 'The gift is changing',
        success: {
          render() {
            setOpenEditModal(false);
            handleGetGifts()
            return 'The gift was changed';
          },
        },
        error: 'Failed to change gift',
      },
    ).catch((err) => console.log(err, 'errr3333'))
  }, [
    levelInputRef,
    categoryInputRef,
    goldPriceInputRef,
    diamondPriceInputRef,
    isPremiumPriceInputRef,
    visiblePriceInputRef,
    imageInputRef,
    currentGiftId,
    titleInputRef,
    positionInputRef,
    timeInputRef,
  ]);

  useEffect(() => {
    handleGetGifts()
  }, [paginationIndex]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {loading ? <CircularProgress /> : (
        <CContainer>
          <Filters
            filters={[{ id: 'null', category: { title: 'Не выбрано' } }, ...(giftsCotegories?.categoryList || [])] || []}
            currentCategory={currentCategory}
            setFilter={(val) => { handleGetGifts(val); }}
          />
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
        timeInputRef={timeInputRef}
        positionInputRef={positionInputRef}
        titleInputRef={titleInputRef}
        handleClose={handleCloseEditModal}
        handleCloseAndUpdate={handleCloseEditModalAndUpdate}
      />
    </div>
  );
}

export default Gifts;
