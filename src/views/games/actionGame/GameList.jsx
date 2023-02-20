import {
  CAccordion, CButton, CContainer, CRow,
} from '@coreui/react';
import React, {
  useEffect, useCallback, useState, useRef,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { useAppDispatch } from 'src/store';
import {
  deleteActionGame, editActionGame, getActionGame, getLoading,
} from 'src/store/Slices/actionGame';
import { CircularProgress, Pagination } from '@mui/material';
import GameItem from './GameItem';
import EditActionGame from './EditGame';

function Games() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleClick = () => navigate('/action-game/add-action-game');

  const games = useSelector((state) => state.actionGame.actionGames);

  const loading = useSelector(getLoading);

  const { search } = useLocation();

  const isPremiumCheckboxRef = useRef(null);
  const visibleCheckboxRef = useRef(null);
  const categoryInputRef = useRef(null)

  const [paginationIndex, setPaginationIndex] = useState(0);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentActionId, setCurrentActionId] = useState(null);
  const [currentAction, setCurrentAction] = useState(null);

  const handleDeleteGame = useCallback((id) => {
    dispatch(deleteActionGame(id));
  }, []);

  const handleOpenEditModal = useCallback((id) => {
    setCurrentActionId(id);
    setCurrentAction(games.find((item) => item.id === id));
    setOpenEditModal(true);
  }, [games]);

  const handleCloseEditModal = useCallback(() => {
    setOpenEditModal(false);
  }, []);

  const handleSetActions = useCallback((title, lang) => {
    setCurrentAction((prev) => ({
      ...prev,
      action: prev.action.map((item) => {
        if (item.language === lang) {
          return {
            language: lang,
            title,
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

    setOpenEditModal(false);
    dispatch(editActionGame({
      ...currentAction,
      visible,
      ispremium,
      category,
    }));
  }, [currentAction, categoryInputRef, visibleCheckboxRef, isPremiumCheckboxRef]);

  useEffect(() => {
    dispatch(getActionGame(search));
  }, []);

  useState(() => {
    setCurrentAction(games.find((item) => +item.id === +currentActionId));
  }, [currentActionId, games]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {loading ? <CircularProgress /> : (
        <CContainer>
          <CRow className="clearfix mb-3">
            <CAccordion activeItemKey={2}>
              {_.sortBy(games, 'id').slice(paginationIndex * 10, (paginationIndex * 10 + 10), 'id')?.map((item, index) => (
                <GameItem
                  deleteGame={handleDeleteGame}
                  handleOpenEditModal={handleOpenEditModal}
                  action={item.action}
                  id={item.id}
                  key={index}
                />
              ))}
            </CAccordion>
          </CRow>
          <Pagination onChange={(_, page) => setPaginationIndex(page - 1)} count={Math.ceil((games?.length || 0) / 10)} />
          <CButton style={{ marginTop: '10px' }} color="info text-white" onClick={handleClick}>Add Game</CButton>
        </CContainer>
      )}
      <EditActionGame
        open={openEditModal}
        action={games.find((item) => item.id === currentActionId)}
        handleClose={handleCloseEditModal}
        handleCloseAndUpdate={handleCloseEditModalAndUpdate}
        handleSetActions={handleSetActions}
        isPremiumCheckbox={isPremiumCheckboxRef}
        isVisible={visibleCheckboxRef}
        categoryInput={categoryInputRef}
      />
    </div>
  );
}

export default Games;
