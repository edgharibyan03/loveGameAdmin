import React, {
  useCallback, useEffect, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { CContainer, CFormCheck } from '@coreui/react';

// routes config
import routes from '../routes';

const Filters = ({ setFilter }) => {
  const [data, setData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = Object.fromEntries([...searchParams]);

  const handleChange = useCallback((val) => {
    console.log(val, 'val');
    setSearchParams({ ...data, ...val });
    setFilter({ ...data, ...val });
    setData({ ...filter });
  }, [data]);
  // console.log(data, 'data');
  // console.log(setFilter, 'setFilter');
  useEffect(() => {
    setData({ ...filter });
  }, []);
  return (
    <CContainer lg>
      <CFormCheck
        id="flexCheckDefault"
        label="Is premium"
        value={data?.ispremium}
        checked={data?.ispremium === 'true'}
        onChange={() => {
          console.log('in onChange');
          const ispremium = !!(data && data.ispremium === 'false');
          handleChange({ ispremium });
        }}
      />
      <CFormCheck
        id="flexCheckDefault1"
        label="Visible"
        value={data?.visible}
        checked={data?.visible === 'true'}
        onChange={() => {
          console.log('in onChange');
          const visible = !!(data && data.visible === 'false');
          handleChange({ visible });
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
