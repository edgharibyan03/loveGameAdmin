import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { CAccordion, CButton, CContainer } from '@coreui/react';
import {
  deleteQuestion, editQuestion, getQuestionGame, questionsLoadingStatus,
} from 'src/store/Slices/questionGame';
import { getPaginationIndex } from 'src/store/Slices/games';
import { toastChangeBody, toastDeleteBody } from 'src/utils/toast';
import { useAppDispatch } from 'src/store';
import { editActionGame } from 'src/store/Slices/actionGame';
import _ from 'lodash';
import EditQuestionGame from './EditGame';
import GameItem from './GameItem';

const Games = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const loading = useSelector(questionsLoadingStatus);
  const games = useSelector((state) => state.questionGame);
  const paginationIndex = useSelector(getPaginationIndex);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // const currentQuestion = useRef(null)

  const isPremiumCheckboxRef = useRef(null);
  const visibleCheckboxRef = useRef(null);
  const categoryInputRef = useRef(null);
  const fileInputRef = useRef(null)

  const handleClick = useCallback(() => navigate('/question-game/add-game'), []);

  const handleDeleteQuestion = useCallback((id) => {
    toast.promise(
      dispatch(deleteQuestion(id)),
      toastDeleteBody('question'),
    )
  }, []);

  const handleOpenEditModal = useCallback((id) => {
    // currentQuestion.current = games.questionGames?.questionList.find((item) => item.id === id)
    setCurrentQuestion(games.questionGames?.questionList.find((item) => item.id === id))
    setOpenEditModal(true);
  }, [games]);

  const handleCloseEditModal = useCallback(() => {
    setOpenEditModal(false);
  }, []);

  const handleSetQuestions = useCallback((question, lang) => {
    // currentQuestion.current.question = prev.question.map((item) => {
    //   if (item.language === lang) {
    //     return {
    //       language: lang,
    //       question,
    //     };
    //   }
    //   return item;
    // }),
    setCurrentQuestion((prev) => ({
      ...prev,
      question: prev.question.map((item) => {
        if (item.language === lang) {
          return {
            language: lang,
            question,
          };
        }
        return item;
      }),
    }));
  }, []);

  const handleCloseEditModalAndUpdate = useCallback(() => {
    const category = categoryInputRef.current?.value;
    const visible = visibleCheckboxRef.current?.checked;
    const ispremium = isPremiumCheckboxRef.current?.checked;
    const { files } = fileInputRef.current;

    if (files.length < 3 && files.length !== 0) {
      toast.warn('Images count should be 3');
    } else {
      toast.promise(
        dispatch(editQuestion({
          ...currentQuestion,
          visible,
          ispremium,
          category,
          files,
        })),
        toastChangeBody('action game', handleCloseEditModal),
      );
    }
  }, [currentQuestion, categoryInputRef, visibleCheckboxRef, isPremiumCheckboxRef, fileInputRef]);

  useEffect(() => {
    dispatch(getQuestionGame(`?skip=${paginationIndex * 10}&take=10`));
  }, [paginationIndex]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {loading ? <CircularProgress /> : (
        <CContainer>
          <CAccordion activeItemKey={2}>
            {
              _.sortBy(games.questionGames?.questionList, 'id').map((item, index) => (
              <GameItem
                handleDeleteQuestion={handleDeleteQuestion}
                handleOpenEditModal={handleOpenEditModal}
                question={item}
                key={index}
              />
              ))
            }
          </CAccordion>
        <CButton color="info text-white" onClick={handleClick}>Add Game</CButton>
        </CContainer>
      )}
      <EditQuestionGame
        isPremiumCheckboxRef={isPremiumCheckboxRef}
        visibleCheckboxRef={visibleCheckboxRef}
        categoryInputRef={categoryInputRef}
        open={openEditModal}
        question={currentQuestion}
        fileInputRef={fileInputRef}
        handleClose={handleCloseEditModal}
        handleSetQuestions={handleSetQuestions}
        handleCloseAndUpdate={handleCloseEditModalAndUpdate}
      />
    </div>
  );
};

export default Games;
