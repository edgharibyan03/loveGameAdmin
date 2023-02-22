import {
  CAccordion, CButton, CContainer, CRow,
} from '@coreui/react';
import React, {
  useEffect, useCallback, useState, useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { CircularProgress } from '@mui/material';
import { useAppDispatch } from 'src/store';
import { editActionGame } from 'src/store/Slices/actionGame';
import { toastChangeBody, toastDeleteBody } from 'src/utils/toast';
import {
  deleteChoiceGame, editChoiceGame, getChoiceGames, getChoiceGamesData, getChoiceGamesLoading,
} from 'src/store/Slices/choiceGame';
import { getPaginationIndex } from 'src/store/Slices/games';
import GameItem from './GameItem';
import EditChoiceGame from './EditGame';

function Games() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleClick = () => navigate('/choice-game/add-choice-game');

  const games = useSelector(getChoiceGamesData);

  const loading = useSelector(getChoiceGamesLoading);

  const paginationIndex = useSelector(getPaginationIndex);

  const isPremiumCheckboxRef = useRef(null);
  const visibleCheckboxRef = useRef(null);
  const categoryInputRef = useRef(null);
  const currentChoice = useRef(null);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentChoiceId, setCurrentChoiceId] = useState(null);

  const handleDeleteGame = useCallback((id) => {
    toast.promise(
      dispatch(deleteChoiceGame(id)).catch((err) => console.log(err, 'err')),
      toastDeleteBody('choice game'),
    );
  }, []);

  const handleOpenEditModal = useCallback((id) => {
    setCurrentChoiceId(id);
    currentChoice.current = games.choiceList.find((item) => item.id === id);
    setOpenEditModal(true);
  }, [games, currentChoice]);

  const handleCloseEditModal = useCallback(() => {
    setOpenEditModal(false);
  }, []);

  const handleSetChoices = useCallback((title, lang) => {
    console.log(currentChoice.current, title, 'dddd');
    currentChoice.current = {
      ...currentChoice.current,
      chouse: currentChoice.current.chouse.map((item) => {
        console.log(item, item.language, lang, title, 'info');
        if (item.language === lang) {
          return {
            language: lang,
            title,
          };
        }
        return item;
      }),
    };
    // setCurrentChoice((prev) => ({
    //   ...prev,
    //   chouse: prev.chouse.map((item) => {
    //     if (item.language === lang) {
    //       return {
    //         language: lang,
    //         title,
    //       };
    //     }
    //     return item;
    //   }),
    // }));
  }, [currentChoice]);

  const handleCloseEditModalAndUpdate = useCallback(() => {
    const category = categoryInputRef.current?.value;
    const visible = visibleCheckboxRef.current?.checked;
    const ispremium = isPremiumCheckboxRef.current?.checked;

    console.log(currentChoice, 'currentChoice2');

    toast.promise(
      dispatch(editChoiceGame({
        ...currentChoice.current,
        visible,
        ispremium,
        category,
      })),
      toastChangeBody('choice game', handleCloseEditModal),
    );
  }, [currentChoice, categoryInputRef, visibleCheckboxRef, isPremiumCheckboxRef]);

  useEffect(() => {
    dispatch(getChoiceGames(`?skip=${paginationIndex * 10}&take=10`));
  }, [paginationIndex]);

  useState(() => {
    currentChoice.current = games?.choiceList?.find((item) => +item.id === +currentChoiceId);
  }, [currentChoiceId, games, currentChoice]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {loading ? <CircularProgress /> : (
        <CContainer>
          <CRow className="clearfix mb-3">
            <CAccordion activeItemKey={2}>
              {_.sortBy(
                games.choiceList,
                'id',
              )?.map((item, index) => (
                <GameItem
                  deleteGame={handleDeleteGame}
                  handleOpenEditModal={handleOpenEditModal}
                  choice={item}
                  id={item.id}
                  key={index}
                />
              ))}
            </CAccordion>
          </CRow>
          <CButton style={{ marginTop: '10px' }} color="info text-white" onClick={handleClick}>Add Game</CButton>
        </CContainer>
      )}
      <EditChoiceGame
        open={openEditModal}
        choice={games?.choiceList?.find((item) => item.id === currentChoiceId)}
        handleClose={handleCloseEditModal}
        handleCloseAndUpdate={handleCloseEditModalAndUpdate}
        handleSetChoices={handleSetChoices}
        isPremiumCheckbox={isPremiumCheckboxRef}
        isVisible={visibleCheckboxRef}
        categoryInput={categoryInputRef}
      />
    </div>
  );
}

export default Games;
