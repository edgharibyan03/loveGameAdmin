import React, {
  useCallback, useEffect, useState,
  useRef,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CContainer, CFormCheck, CFormInput, CFormSelect,
} from '@coreui/react';

// routes config
import { getGiftsCategories } from 'src/store/Slices/giftsCotegories';
import { useAppDispatch } from 'src/store';

const Filters = ({
  setFilter,
  currentCategory,
  filters,
  questionGameCategories,
  search,
}) => {
  const dispatch = useAppDispatch();

  const [data, setData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const timeoutRef = useRef(null)

  const filter = Object.fromEntries([...searchParams]);

  const handleChange = useCallback((val) => {
    setFilter({ ...data, ...val });
    setData((prev) => ({ ...prev, ...val }));
  }, [data]);

  useEffect(() => {
    setData({ ...filter });
    dispatch(getGiftsCategories('?skip=0&take=1000'));
  }, []);

  return (
    <CContainer
      lg
      style={{
        display: 'flex',
        alignItems: 'center',
        width: 'calc(fit-content + 30px)',
        marginBottom: '10px',
      }}
    >
      {filters && (
        <CFormSelect
          aria-label="Default select example"
          onChange={(e) => {
            handleChange({ category: e.target.value });
          }}
          value={currentCategory?.id}
        >
          {filters?.map && filters.map((category, ind) => {
            return (
              category.category && (
                <option
                  key={ind}
                  value={category.id}
                >
                  {category.category.title}
                </option>
              )
            );
          })}
        </CFormSelect>
      )}
      {questionGameCategories && (
        <CFormSelect
          aria-label="Default select example"
          style={{
            width: 100,
          }}
          onChange={(e) => {
            handleChange({ category: e.target.value });
          }}
          value={currentCategory}
        >
          {questionGameCategories?.map && questionGameCategories.map((category, ind) => {
            return (
              <option
                key={ind}
                value={category}
              >
                {category}
              </option>
            );
          })}
        </CFormSelect>
      )}
      <div
        style={{
          margin: '0 10px',
        }}
      >
        <CFormCheck
          id="flexCheckDefault"
          label="Is premium"
          value={data?.ispremium}
          checked={data?.ispremium === 'true'}
          onChange={(e) => {
            console.log(e.target.checked, data?.ispremium, 'in onChange');
            handleChange({ ispremium: e.target.checked });
          }}
        />
      </div>
      <CFormCheck
        id="flexCheckDefault1"
        label="Visible"
        value={data?.visible}
        checked={data?.visible === 'true'}
        onChange={(e) => {
          console.log('in onChange');
          handleChange({ visible: e.target.checked });
        }}
      />
      {search && (
        <CFormInput
          type="text"
          id="exampleFormControlInput1"
          className="search-input"
          placeholder="Search..."
          defaultValue={data?.title}
          style={{
            width: '200px',
            marginLeft: 'auto',
          }}
          onInput={(e) => {
            clearTimeout(timeoutRef.current);
            console.log(e.target.value, '3201301203201302103012');
            timeoutRef.current = setTimeout(() => {
              handleChange({ title: e.target.value });
            }, 500);
          }}
          aria-describedby="exampleFormControlInputHelpInline"
        />
      )}
      {/* <CFormSelect
        onChange={(e) => handleChange({ category: e.target.value })}
        aria-label="Category"
        options={[
          'Open this select menu',
          { label: 'One', value: '1' },
          { label: 'Two', value: '2' },
          { label: 'Three', value: '3', disabled: true },
        ]}
      /> */}
    </CContainer>
  );
};

export default Filters;
