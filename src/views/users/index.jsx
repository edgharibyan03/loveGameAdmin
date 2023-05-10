import { CFormInput } from '@coreui/react';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import UsersList from 'src/components/users/UsersList';
import { changePaginationIndex, getPaginationIndex } from 'src/store/Slices/games';
import { getUsers, getUsersInfo } from 'src/store/Slices/users';
import './style.scss'

const qs = require('querystringify');

export default function Users() {
  const dispatch = useDispatch();

  const users = useSelector(getUsersInfo);
  const paginationIndex = useSelector(getPaginationIndex);

  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState(null);

  const timeoutRef = useRef(null);

  const handleGetUsers = useCallback((data) => {
    const searchObj = Object.fromEntries([...searchParams]);
    const filterObj = {
      category: '1',
      ispremium: 'false',
      visible: 'true',
      firstName: '',
      lastName: '',
      id: '',
      ...searchObj,
      ...data,
      skip: (paginationIndex || 0) * 10,
      take: 10,
    };

    setSearchParams(filterObj);
    const filterStringify = qs.stringify(filterObj, true);
    dispatch(getUsers(filterStringify));
  }, [paginationIndex, searchParams]);

  useEffect(() => {
    handleGetUsers(0);
  }, [paginationIndex]);

  useEffect(() => {
    dispatch(changePaginationIndex(0));
  }, [])

  console.log(paginationIndex, 'users222');

  return (
    <div className="users">
      <div className="users-head">
        <CFormInput
          type="text"
          id="exampleFormControlInput1"
          className="search-input"
          placeholder="First name"
          defaultValue={data?.firstName}
          style={{
            width: '200px',
          }}
          onInput={(e) => {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
              setData({ firstName: e.target.value });
              handleGetUsers({ firstName: e.target.value });
            }, 500);
          }}
          aria-describedby="exampleFormControlInputHelpInline"
        />
        <CFormInput
          type="text"
          id="exampleFormControlInput1"
          className="search-input"
          placeholder="Last name"
          defaultValue={data?.lastName}
          style={{
            width: '200px',
          }}
          onInput={(e) => {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
              setData({ lastName: e.target.value });
              handleGetUsers({ lastName: e.target.value });
            }, 500);
          }}
          aria-describedby="exampleFormControlInputHelpInline"
        />
        <CFormInput
          type="text"
          id="exampleFormControlInput1"
          className="search-input"
          placeholder="ID"
          defaultValue={data?.id}
          style={{
            width: '200px',
          }}
          onInput={(e) => {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
              setData({ id: e.target.value });
              handleGetUsers({ id: e.target.value });
            }, 500);
          }}
          aria-describedby="exampleFormControlInputHelpInline"
        />
      </div>
      <UsersList
        list={users.userList}
      />
    </div>
  );
}
