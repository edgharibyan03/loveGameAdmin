import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  CAccordion, CButton, CContainer, CRow,
} from '@coreui/react';
import _ from 'lodash';
import {
  deleteKaraoke, editKaraoke, getKaraokeGames, karaokeLoading,
} from 'src/store/Slices/karaokeGame';
import { useAppDispatch } from 'src/store';
import { CircularProgress, Pagination } from '@mui/material';
import GameItem from './GameItem';
import EditKaraoke from './EditGame';

const Games = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleClick = () => navigate('/karaoke-game/add-karaoke-game');

  const games = useSelector((state) => state.karaokeGame);
  const loading = useSelector(karaokeLoading);

  const isPremiumCheckboxRef = useRef(null);
  const visibleCheckboxRef = useRef(null);
  const categoryInputRef = useRef(null)

  const [paginationIndex, setPaginationIndex] = useState(0);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentKaraokeId, setCurrentKaraokeId] = useState(null);

  const langInputRef = useRef(null);
  const titleInputRef = useRef(null);
  const linkInputRef = useRef(null);

  const handleDeleteKaraoke = useCallback((id) => {
    dispatch(deleteKaraoke(id));
  }, []);

  const handleOpenEditModal = useCallback((id) => {
    setCurrentKaraokeId(id);
    setOpenEditModal(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setOpenEditModal(false);
  }, []);

  const handleGetGames = useCallback(() => {
    dispatch(getKaraokeGames());
  }, []);

  const handleCloseEditModalAndUpdate = useCallback(() => {
    console.log(langInputRef.current.value, titleInputRef.current.value, linkInputRef.current.value, 'valueeee');
    const langInputRefValue = langInputRef.current.value;
    const titleInputRefValue = titleInputRef.current.value;
    const linkInputRefValue = linkInputRef.current.value;

    const category = categoryInputRef.current?.value;
    const visible = visibleCheckboxRef.current?.checked;
    const ispremium = isPremiumCheckboxRef.current?.checked;

    const data = {
      id: currentKaraokeId,
      karaoke: {
        language: langInputRefValue,
        title: titleInputRefValue,
      },
      link: linkInputRefValue,
      visible,
      category,
      ispremium,
      handleGetGames,
    };

    if (langInputRefValue && titleInputRefValue && linkInputRefValue) {
      setOpenEditModal(false);
      dispatch(editKaraoke(data));
    }
  }, [
    langInputRef,
    titleInputRef,
    linkInputRef,
    currentKaraokeId,
    categoryInputRef,
    visibleCheckboxRef,
    isPremiumCheckboxRef,
  ]);

  useEffect(() => {
    handleGetGames();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {loading ? <CircularProgress /> : (
        <CContainer>
        <CRow className="clearfix mb-3">
            <CAccordion activeItemKey={2}>
              {_.sortBy(games.games, 'id')?.slice(paginationIndex * 10, (paginationIndex * 10 + 10), 'id').map((item, index) => (
                <GameItem
                  name={item.karaoke.title}
                  language={item.karaoke.language}
                  link={item.link}
                  key={index}
                  handleDeleteKaraoke={handleDeleteKaraoke}
                  handleOpenEditModal={handleOpenEditModal}
                  id={item.id}
                />
              ))}
            </CAccordion>
        </CRow>
          <Pagination onChange={(_, page) => setPaginationIndex(page - 1)} count={Math.ceil((games.games?.length || 0) / 10)} />
          <CButton style={{ marginTop: '20px' }} color="info text-white" onClick={handleClick}>Add Game</CButton>
        </CContainer>
      )}
      <EditKaraoke
        open={openEditModal}
        langInputRef={langInputRef}
        titleInputRef={titleInputRef}
        linkInputRef={linkInputRef}
        handleClose={handleCloseEditModal}
        handleCloseAndUpdate={handleCloseEditModalAndUpdate}
        karaoke={games.games.find((item) => item.id === currentKaraokeId)}
        isPremiumCheckbox={isPremiumCheckboxRef}
        isVisible={visibleCheckboxRef}
        categoryInput={categoryInputRef}
      />
    </div>
  );
};

export default Games;
