import { CButton,  CContainer, CRow } from '@coreui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getQuestionGame } from 'src/store/Slices/questionGame';
import { useSearchParams, useParams, useLocation } from "react-router-dom";
import GameItem from './GameItem';
import { useAppDispatch } from 'src/store';
var qs = require('querystringify');

const Games = () => {
  const dispatch=useAppDispatch();
  const navigate = useNavigate();
  const handleClick = () => navigate('/question-game/add-game');
  const search = useLocation().search;
  const games = useSelector((state) => state.questionGame);
  useEffect(()=>{
    console.log(search,'search');
    const params =qs.parse(search);
    console.log(params,'params');
    dispatch(getQuestionGame(search)); 
  },[])
  console.log(games,'games');
  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <CContainer>
        <CRow className="clearfix mb-3">
          {games.questionGames?.map((item, index) => <GameItem question={item.question} key={index} />)}
        </CRow>
        <CButton color="info" onClick={handleClick}>Add Game</CButton>

      </CContainer>
    </div>
  );
};

export default Games;
