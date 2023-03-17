/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

export default function UsersItem({
  id, firstName, lastName, handleSetCurrentUserId,
}) {
  return (
    <tr className="users-item">
      <th scope="row">{id}</th>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td className="users-item-money" onClick={() => handleSetCurrentUserId(id)}>
        Add money
      </td>
    </tr>
  );
}
