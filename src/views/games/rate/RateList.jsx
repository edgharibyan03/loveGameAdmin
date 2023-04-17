import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { CAccordion, CButton, CContainer } from '@coreui/react';
import {
  deleteQuestion, editQuestion,
} from 'src/store/Slices/questionGame';
import { getPaginationIndex } from 'src/store/Slices/games';
import { toastChangeBody, toastDeleteBody } from 'src/utils/toast';
import { useAppDispatch } from 'src/store';
import _ from 'lodash';
import Filters from 'src/components/filters';
import { getRates } from 'src/store/Slices/rate';

const qs = require('querystringify');

const Rate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const rates = useSelector((state) => state.rate.rates);
  console.log(rates);
  const paginationIndex = useSelector(getPaginationIndex);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [changeImages, setChangeImages] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(1);

  const currentQuestion = useRef(null);

  const isPremiumCheckboxRef = useRef(null);
  const visibleCheckboxRef = useRef(null);
  const categoryInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = useCallback(() => navigate('/question-game/add-game'), []);

  const handleDeleteQuestion = useCallback((id) => {
    toast.promise(
      dispatch(deleteQuestion(id)),
      toastDeleteBody('question'),
    );
  }, []);

  const handleOpenEditModal = useCallback((id) => {
    // currentQuestion.current = games.questionGames?.questionList.find((item) => item.id === id);
    // setOpenEditModal(true);
  }, [currentQuestion]);

  const handleCloseEditModal = useCallback(() => {
    setOpenEditModal(false);
  }, []);

  const handleSetQuestions = useCallback((question, lang) => {
    const newQuestion = currentQuestion.current.question.map((item) => {
      if (item.language === lang) {
        return {
          language: lang,
          question,
          images: item.images,
        };
      }
      return item;
    });
    currentQuestion.current = {
      ...currentQuestion.current,
      question: newQuestion,
    };
  }, [currentQuestion]);

  const handleCloseEditModalAndUpdate = useCallback(() => {
    const category = categoryInputRef.current?.value;
    const visible = visibleCheckboxRef.current?.checked;
    const ispremium = isPremiumCheckboxRef.current?.checked;
    const { files } = fileInputRef.current;

    if (files.length < 3 && files.length !== 0 && changeImages) {
      toast.warn('Images count should be 3');
    } else {
      toast.promise(
        dispatch(editQuestion({
          question: currentQuestion.current.question,
          visible,
          ispremium,
          category,
          files,
          id: currentQuestion.current.id,
        })),
        toastChangeBody('action game', handleCloseEditModal),
      );
    }
  }, [currentQuestion, categoryInputRef, visibleCheckboxRef, isPremiumCheckboxRef, fileInputRef, changeImages]);

  const handleGetRates = useCallback((data) => {
    const searchObj = Object.fromEntries([...searchParams]);
    console.log(data, 'data32');
    const filterObj = {
      category: '1',
      ispremium: 'false',
      visible: 'true',
      ...searchObj,
      ...data,
      skip: paginationIndex * 10,
      take: 10,
    };
    setSearchParams(filterObj);
    const filterStringify = qs.stringify(filterObj, true);
    setCurrentCategory(filterObj.category);
    console.log(filterStringify, 'dispatch');
    dispatch(getRates(filterStringify));
  }, [paginationIndex]);

  useEffect(() => {
    handleGetRates();
  }, [paginationIndex]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {rates.status === 'loading' ? <CircularProgress /> : (
        <CContainer>
          <Filters
            setFilter={(val) => { handleGetGames(val); }}
            questionGameCategories={[1, 2, 3]}
            currentCategory={currentCategory}
            search
          />
          <CAccordion activeItemKey={2}>
            {/* {
              _.sortBy(games.questionGames?.questionList, 'id').map((item, index) => (
                <GameItem
                  handleDeleteQuestion={handleDeleteQuestion}
                  handleOpenEditModal={handleOpenEditModal}
                  question={item}
                  key={index}
                />
              ))
            } */}
          </CAccordion>
          <CButton color="info text-white" onClick={handleClick}>Add Game</CButton>
        </CContainer>
      )}
      {/* <EditQuestionGame
        isPremiumCheckboxRef={isPremiumCheckboxRef}
        visibleCheckboxRef={visibleCheckboxRef}
        categoryInputRef={categoryInputRef}
        open={openEditModal}
        question={currentQuestion.current}
        fileInputRef={fileInputRef}
        changeImages={changeImages}
        setChangeImages={setChangeImages}
        handleClose={handleCloseEditModal}
        handleSetQuestions={handleSetQuestions}
        handleCloseAndUpdate={handleCloseEditModalAndUpdate}
      /> */}
    </div>
  );
};

export default Rate;
