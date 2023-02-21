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
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import { toastChangeBody, toastDeleteBody } from 'src/utils/toast';
import { getPaginationIndex } from 'src/store/Slices/games';
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

  const paginationIndex = useSelector(getPaginationIndex);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentActionId, setCurrentActionId] = useState(null);
  const [currentAction, setCurrentAction] = useState(null);

  const handleDeleteGame = useCallback((id) => {
    toast.promise(
      dispatch(deleteActionGame(id)),
      toastDeleteBody('action game'),
    )
  }, []);

  const handleOpenEditModal = useCallback((id) => {
    setCurrentActionId(id);
    setCurrentAction(games.actionList.find((item) => item.id === id));
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

    toast.promise(
      dispatch(editActionGame({
        ...currentAction,
        visible,
        ispremium,
        category,
      })),
      toastChangeBody('action game', handleCloseEditModal),
    )
  }, [currentAction, categoryInputRef, visibleCheckboxRef, isPremiumCheckboxRef]);

  useEffect(() => {
    dispatch(getActionGame(`?skip=${paginationIndex * 10}&take=10`));
  }, [paginationIndex]);

  useState(() => {
    setCurrentAction(games?.actionList?.find((item) => +item.id === +currentActionId));
  }, [currentActionId, games]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {loading ? <CircularProgress /> : (
        <CContainer>
          <CRow className="clearfix mb-3">
            <CAccordion activeItemKey={2}>
              {_.sortBy(
                games.actionList,
                'id',
              )?.map((item, index) => (
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
          <CButton style={{ marginTop: '10px' }} color="info text-white" onClick={handleClick}>Add Game</CButton>
        </CContainer>
      )}
      <EditActionGame
        open={openEditModal}
        action={games?.actionList?.find((item) => item.id === currentActionId)}
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
