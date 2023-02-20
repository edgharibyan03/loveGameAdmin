import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  CAccordion, CButton, CContainer,
} from '@coreui/react';
import { deleteQuestion, getQuestionGame, questionsLoadingStatus } from 'src/store/Slices/questionGame';
import { useAppDispatch, use, useAppSelector } from 'src/store';
import { CircularProgress, Pagination } from '@mui/material';
import GameItem from './GameItem';

const Games = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const loading = useSelector(questionsLoadingStatus);

  const [paginationIndex, setPaginationIndex] = useState(0);

  const handleClick = useCallback(() => navigate('/question-game/add-game'), []);

  const { search } = useLocation();
  const games = useSelector((state) => state.questionGame);
  console.log(games.questionGames, 'paginationIndex');

  const handleDeleteQuestion = useCallback((id) => {
    dispatch(deleteQuestion(id));
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
                question={item}
                index={index}
                key={index}
              />
            ))}
        </CAccordion>
          <Pagination onChange={(_, page) => setPaginationIndex(page - 1)} count={Math.ceil((games.questionGames?.length || 0) / 20)} />
        <CButton color="info text-white" onClick={handleClick}>Add Game</CButton>
        </CContainer>
      )}
    </div>
  );
};

export default Games;
