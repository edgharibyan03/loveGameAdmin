import React from 'react';

const GiftItem = ({ gift }) => (
  <div>
    <li>{gift?.path}</li>
  </div>
);

export default GiftItem;
