import React from 'react';

import styles from './TableRow.module.scss';

export const TableRow = ({ user, onClick }) => {
  return (
    <tr onClick={onClick}>
      <td className={styles.td}>
        {user.firstName}
        <br />
        {user.lastName}
        <br />
        {user.maidenName}
      </td>
      <td className={styles.td}>{user.age}</td>
      <td className={styles.td}>{user.gender}</td>
      <td className={styles.td}>{user.phone}</td>
      <td className={styles.td}>
        {user.address.city}
        <br />
        {user.address.address}
      </td>
    </tr>
  );
};
