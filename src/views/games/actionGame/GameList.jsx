import {
  CAccordion, CButton, CContainer, CRow,
} from '@coreui/react';
import React, {
  useEffect, useCallback, useState, useRef,
} from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
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
import Filters from 'src/components/filters';
import GameItem from './GameItem';
import EditActionGame from './EditGame';

const qs = require('querystringify');

function Games() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleClick = () => navigate('/action-game/add-action-game');
  const [searchParams, setSearchParams] = useSearchParams();
  const games = useSelector((state) => state.actionGame.actionGames);

  const loading = useSelector(getLoading);

  const isPremiumCheckboxRef = useRef(null);
  const visibleCheckboxRef = useRef(null);
  const categoryInputRef = useRef(null)
  const currentAction = useRef(null)

  const paginationIndex = useSelector(getPaginationIndex);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentActionId, setCurrentActionId] = useState(null);
  // const [currentAction, setCurrentAction] = useState(null);

  const handleDeleteGame = useCallback((id) => {
    toast.promise(
      dispatch(deleteActionGame(id)),
      toastDeleteBody('action game'),
    )
  }, []);

  const handleOpenEditModal = useCallback((id) => {
    setCurrentActionId(id);
    // setCurrentAction(games.actionList.find((item) => item.id === id));
    currentAction.current = games.actionList.find((item) => item.id === id);
    setOpenEditModal(true);
  }, [games, currentAction]);

  const handleCloseEditModal = useCallback(() => {
    setOpenEditModal(false);
  }, []);

  const handleSetActions = useCallback((title, lang) => {
    currentAction.current = {
      ...currentAction.current,
      action: currentAction.current.action.map((item) => {
        if (item.language === lang) {
          return {
            language: lang,
            title,
          };
        }
        return item;
      }),
    };
  }, [currentAction.current]);

  const handleCloseEditModalAndUpdate = useCallback(() => {
    const category = categoryInputRef.current?.value;
    const visible = visibleCheckboxRef.current?.checked;
    const ispremium = isPremiumCheckboxRef.current?.checked;

    console.log(currentAction.current, '320103210');

    toast.promise(
      dispatch(editActionGame({
        action: currentAction.current.action,
        visible,
        ispremium,
        category,
        id: currentActionId,
      })),
      toastChangeBody('action game', handleCloseEditModal),
    )
  }, [currentAction, categoryInputRef, visibleCheckboxRef, isPremiumCheckboxRef, currentActionId]);
  const handleGetGames = useCallback((data) => {
    const searchObj = Object.fromEntries([...searchParams]);
    const filterObj = {
      category: '1',
      ispremium: 'false',
      visible: 'true',
      ...searchObj,
      ...data,
      skip: paginationIndex * 10,
      take: 10,
    }
    const filterStringify = qs.stringify(filterObj, true);
    setSearchParams(filterObj);
    dispatch(getActionGame(filterStringify));
  }, [paginationIndex]);
  useEffect(() => {
    handleGetGames()
    // dispatch(getActionGame(`?skip=${paginationIndex * 10}&take=10`));
  }, [paginationIndex]);

  useState(() => {
    currentAction.current = games?.actionList?.find((item) => +item.id === +currentActionId)
    // setCurrentAction(games?.actionList?.find((item) => +item.id === +currentActionId));
  }, [currentActionId, games]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {loading ? <CircularProgress /> : (
        <CContainer>
           <Filters setFilter={(val) => { handleGetGames(val) }} />
          <CRow className="clearfix mb-3">
            <CAccordion activeItemKey={2}>
              {_.sortBy(
                games.actionList,
                'id',
              )?.map((item, index) => (
                <GameItem
                  deleteGame={handleDeleteGame}
                  handleOpenEditModal={handleOpenEditModal}
                  action={item}
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
