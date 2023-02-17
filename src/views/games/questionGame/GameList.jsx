import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  CAccordion, CButton, CContainer,
} from '@coreui/react';
import { getQuestionGame } from 'src/store/Slices/questionGame';
import { useAppDispatch } from 'src/store';
import GameItem from './GameItem';

const Games = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleClick = useCallback(() => navigate('/question-game/add-game'), []);

  const { search } = useLocation();
  const games = useSelector((state) => state.questionGame);

  useEffect(() => {
    dispatch(getQuestionGame(search));
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <CContainer>
        <CAccordion activeItemKey={2}>
          {games.questionGames?.map((item, index) => <GameItem question={item.question} key={index} />)}
        </CAccordion>
        <CButton color="info text-white" onClick={handleClick}>Add Game</CButton>
      </CContainer>
    </div>
  );
};

export default Games;
