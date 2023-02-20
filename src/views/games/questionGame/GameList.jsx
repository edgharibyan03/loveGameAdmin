import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  CAccordion, CButton, CContainer,
} from '@coreui/react';
import { deleteQuestion, getQuestionGame, questionsLoadingStatus } from 'src/store/Slices/questionGame';
import { useAppDispatch } from 'src/store';
import { CircularProgress, Pagination } from '@mui/material';
import GameItem from './GameItem';
import EditQuestionGame from './EditGame';

const Games = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { search } = useLocation();

  const loading = useSelector(questionsLoadingStatus);

  const [paginationIndex, setPaginationIndex] = useState(0);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentQuestionGameId, setCurrentQuestionGameId] = useState(null);

  const handleClick = useCallback(() => navigate('/question-game/add-game'), []);

  const games = useSelector((state) => state.questionGame);
  console.log(games.questionGames, 'paginationIndex');

  const handleDeleteQuestion = useCallback((id) => {
    dispatch(deleteQuestion(id));
  }, []);

  const handleOpenEditModal = useCallback((id) => {
    setCurrentQuestionGameId(id);
    setOpenEditModal(true);
  }, []);

  console.log(currentQuestionGameId, 'currentQuestionGameId');

  const handleCloseEditModal = useCallback(() => {
    setOpenEditModal(false);
  }, []);

  useEffect(() => {
    dispatch(getQuestionGame(search));
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {loading ? <CircularProgress /> : (
        <CContainer>
        <CAccordion activeItemKey={2}>
            {games.questionGames?.slice(paginationIndex * 10, (paginationIndex * 10 + 21)).map((item, index) => (
              <GameItem
                handleDeleteQuestion={handleDeleteQuestion}
                handleOpenEditModal={handleOpenEditModal}
                question={item}
                key={index}
              />
            ))}
        </CAccordion>
          <Pagination onChange={(_, page) => setPaginationIndex(page - 1)} count={Math.ceil((games.questionGames?.length || 0) / 20)} />
        <CButton color="info text-white" onClick={handleClick}>Add Game</CButton>
        </CContainer>
      )}
      <EditQuestionGame
        open={openEditModal}
        handleClose={handleCloseEditModal}
      />
    </div>
  );
};

export default Games;
