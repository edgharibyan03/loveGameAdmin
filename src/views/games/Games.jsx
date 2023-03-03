import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CContainer, CListGroup, CListGroupItem } from '@coreui/react';
import { useDispatch } from 'react-redux';
import './style.css';
import { changePaginationIndex } from 'src/store/Slices/games';

const Games = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changePaginationIndex(0));
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
    <CContainer>
      <CListGroup>
        <CListGroupItem>
          <Link to="/question-game" className="game-item">Game with question</Link>
        </CListGroupItem>
        <CListGroupItem>
          <Link to="/action-game" className="game-item">Action game</Link>
        </CListGroupItem>
        <CListGroupItem>
          <Link to="/karaoke-game" className="game-item">Karaoke</Link>
        </CListGroupItem>
        <CListGroupItem>
          <Link to="/gift-categories" className="game-item">Gifts Categories</Link>
        </CListGroupItem>
        <CListGroupItem>
          <Link to="/gifts" className="game-item">Gifts</Link>
        </CListGroupItem>
          <CListGroupItem>
            <Link to="/choice-game" className="game-item">Choices</Link>
          </CListGroupItem>
      </CListGroup>
      {/* <CRow className="clearfix">
            {games.map((item, index) => <GameItem question={item.question} images={item.images} key={index} />)}
          </CRow>
          <CButton color="info" onClick={handleClick}>Add Game</CButton> */}
    </CContainer>
    </div>
  );
}

export default Games;
