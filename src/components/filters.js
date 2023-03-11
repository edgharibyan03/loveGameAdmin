import React, {
  useCallback, useEffect, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CContainer, CFormCheck, CFormInput, CFormSelect,
} from '@coreui/react';

// routes config
import { getGiftsCategories } from 'src/store/Slices/giftsCotegories';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/store';

const Filters = ({ setFilter, currentCategory, filters }) => {
  const dispatch = useAppDispatch();

  const [data, setData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = Object.fromEntries([...searchParams]);

  console.log(filter, 'filter22');

  const handleChange = useCallback((val) => {
    console.log(data, val, '302103100312');
    // setSearchParams({ ...data, ...val });
    setFilter({ ...data, ...val });
    setData((prev) => ({ ...prev, ...val }));
  }, [data]);

  useEffect(() => {
    setData({ ...filter });
    dispatch(getGiftsCategories('?skip=0&take=1000'));
  }, []);

  console.log(currentCategory, 'giftsCotegoriesgiftsCotegoriesgiftsCotegoriesgiftsCotegoriesgiftsCotegories');

  return (
    <CContainer lg>
      {filters && (
        <CFormSelect
          aria-label="Default select example"
          onChange={(e) => {
            console.log(e.target.value, '3-123-21-3-213-1');
            handleChange({ category: e.target.value });
          }}
          value={currentCategory?.id}
        >
          {/* { giftsCotegories?.categoryList?.map((cotegory, ind) => (<option key={ind} value={+cotegory.id}>{cotegory.title}</option>))} */}
          {filters?.map && filters.map((category, ind) => {
            console.log(category, 'categoryItem');
            return (
              category.category && (
                <option
                  key={ind}
                  value={+category.id}
                >
                  {category.category.title}
                </option>
              )
            );
          })}
        </CFormSelect>
      )}
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
