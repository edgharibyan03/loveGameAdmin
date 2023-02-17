import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CButton, CContainer, CRow } from '@coreui/react';
import { getKaraokeGames } from 'src/store/Slices/karaokeGame';
import { useAppDispatch } from 'src/store';
import GameItem from './GameItem';

const Games = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClick = () => navigate('/karaoke-game/add-karaoke-game');
  const games = useSelector((state) => state.karaokeGame);

  useEffect(() => {
    dispatch(getKaraokeGames());
    // getAction()
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <CContainer>
        <CRow className="clearfix mb-3">
          {games.games.map((item, index) => <GameItem name={item.name} language={item.language} link={item.link} key={index} />)}
        </CRow>
        <CButton color="info text-white" onClick={handleClick}>Add Game</CButton>

      </CContainer>
    </div>
  );
};

export default Games;
