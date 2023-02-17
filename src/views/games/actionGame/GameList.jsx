import { CButton, CContainer, CRow } from '@coreui/react';
import React, { useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/store';
import { deleteActionGame, getActionGame } from 'src/store/Slices/actionGame';
import GameItem from './GameItem';

function Games() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClick = () => navigate('/action-game/add-action-game');
  const games = useSelector((state) => state.actionGame.actionGames);
  const { search } = useLocation();
  useEffect(() => {
    dispatch(getActionGame(search));
    // getAction()
    console.log('in useEffect');
  }, []);
  const deleteGame = useCallback((id) => {
    dispatch(deleteActionGame(id));
  }, []);
  console.log(games, 'gamesgamesgames');
  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <CContainer>
        <CRow className="clearfix mb-3">
          {games?.map((item, index) => (
            <GameItem
              deleteGame={() => {
                console.log('dale');
                deleteGame(item.id);
              }}
              action={item.action}
              key={index}
            />
          ))}
        </CRow>
        <CButton color="info text-white" onClick={handleClick}>Add Game</CButton>

      </CContainer>
    </div>
  );
}

export default Games;
