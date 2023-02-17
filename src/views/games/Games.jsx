import { CContainer, CListGroup, CListGroupItem } from '@coreui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Games = () => (
  <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CListGroup>
        <CListGroupItem>
          <Link to="/question-game">Game with question</Link>
        </CListGroupItem>
        <CListGroupItem>
          <Link to="/action-game">Action game</Link>
        </CListGroupItem>
        <CListGroupItem>
          <Link to="/karaoke-game">Karaoke</Link>
        </CListGroupItem>
        <CListGroupItem>
          <Link to="/gifts">Gifts</Link>
        </CListGroupItem>
      </CListGroup>
      {/* <CRow className="clearfix">
          {games.map((item, index) => <GameItem question={item.question} images={item.images} key={index} />)}
        </CRow>
        <CButton color="info" onClick={handleClick}>Add Game</CButton> */}

    </CContainer>
  </div>
);

export default Games;
