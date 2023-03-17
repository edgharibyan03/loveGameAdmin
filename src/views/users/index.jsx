import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import UsersList from 'src/components/users/UsersList';
import { getPaginationIndex } from 'src/store/Slices/games';
import { getUsers, getUsersInfo } from 'src/store/Slices/users';

const qs = require('querystringify');

export default function Users() {
  const dispatch = useDispatch();

  const users = useSelector(getUsersInfo);
  const paginationIndex = useSelector(getPaginationIndex);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleGetUsers = useCallback(() => {
    const searchObj = Object.fromEntries([...searchParams]);
    console.log(paginationIndex, 'paginationIndexpaginationIndex');
    const filterObj = {
      category: '1',
      ispremium: 'false',
      visible: 'true',
      firstName: '',
      lastName: '',
      ...searchObj,
      // ...data,
      skip: paginationIndex * 10,
      take: 10,
    };
    setSearchParams(filterObj);
    const filterStringify = qs.stringify(filterObj, true);

    dispatch(getUsers(filterStringify));
  }, []);

  useEffect(() => {
    handleGetUsers();
  }, []);

  console.log(users, 'users222');

  return (
    <div>
      <UsersList
        list={users.userList}
      />
    </div>
  );
}
