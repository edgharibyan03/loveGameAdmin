import React, { useCallback, useMemo } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Pagination } from '@mui/material';
import { useAppDispatch } from 'src/store';
import { changePaginationIndex } from 'src/store/Slices/games';
import routes from '../routes';

const AppBreadcrumb = () => {
  const karaokeGames = useSelector((state) => state.karaokeGame);
  const actionGames = useSelector((state) => state.actionGame.actionGames);
  const gifts = useSelector((state) => state.gifts.gifts);
  const questionGames = useSelector((state) => state.questionGame);

  console.log(karaokeGames, actionGames, gifts, questionGames, 'ddddasas');

  const currentLocation = useLocation().pathname;

  const dispatch = useAppDispatch();

  const games = useMemo(() => {
    if (currentLocation.includes('gifts')) {
      return gifts;
    }
    if (currentLocation.includes('question-game')) {
      return questionGames?.questionGames;
    }
    if (currentLocation.includes('action-game')) {
      return actionGames;
    }
    if (currentLocation.includes('karaoke-game')) {
      return karaokeGames?.games;
    }

    return [];
  }, [currentLocation, karaokeGames, actionGames, gifts, questionGames]);

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname);
    return currentRoute ? currentRoute.name : false;
  };

  const getBreadcrumbs = (location) => {
    const breadcrumbs = [];
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`;
      const routeName = getRouteName(currentPathname, routes);
      routeName
        && breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length,
        });
      return currentPathname;
    });
    return breadcrumbs;
  };

  const handleChangePaginationIndex = useCallback((index) => {
    dispatch(changePaginationIndex(index));
  }, [])

  const breadcrumbs = getBreadcrumbs(currentLocation);

  return (
    <div className="d-flex w-100 justify-content-between">
      <div className="d-flex">
        <Link to="/" style={{ listStyleType: 'none', marginRight: '5px' }}>Home</Link>
        {breadcrumbs.map((breadcrumb) => (
          <Link style={{ marginLeft: '10px' }} key={Math.random()} to={breadcrumb.pathname}>
            {breadcrumb.name}
          </Link>
        ))}
      </div>
      {games && games.count > 0 && (
        <Pagination
          onChange={(_, page) => handleChangePaginationIndex(page - 1)}
          count={Math.ceil((games?.count || 0) / 10)} />
      )}
    </div>
  );
};

export default React.memo(AppBreadcrumb);
