import React from 'react';

import styles from './Table.module.scss';

import { TableRow } from '../TableRow';

export const Table = ({ users, handleSort, sortConfig, onClickUser }) => {
  const tableRef = React.useRef();

  const handleMouseDown = (event, colIndex) => {
    const startX = event.clientX;
    const startWidth = tableRef.current.querySelector(`th:nth-child(${colIndex + 1})`).offsetWidth;

    const handleMouseMove = (moveEvent) => {
      const newWidth = startWidth + moveEvent.clientX - startX;
      tableRef.current
        .querySelectorAll(`th:nth-child(${colIndex + 1}), td:nth-child(${colIndex + 1})`)
        .forEach((el) => {
          el.style.width = `${newWidth}px`;
        });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <table className={styles.table} ref={tableRef}>
      <thead>
        <tr className={styles.tr}>
          <th className={styles.th} onClick={() => handleSort('firstName')}>
            ФИО
            {sortConfig.key === 'firstName' &&
              (sortConfig.direction === 'ascending'
                ? ' ↑'
                : sortConfig.direction === 'descending'
                ? ' ↓'
                : '')}
            <div
              className={styles.resizer}
              onMouseDown={(event) => handleMouseDown(event, 0)}></div>
          </th>
          <th className={styles.th} onClick={() => handleSort('age')}>
            Возраст
            {sortConfig.key === 'age' &&
              (sortConfig.direction === 'ascending'
                ? ' ↑'
                : sortConfig.direction === 'descending'
                ? ' ↓'
                : '')}
            <div
              className={styles.resizer}
              onMouseDown={(event) => handleMouseDown(event, 1)}></div>
          </th>
          <th className={styles.th} onClick={() => handleSort('gender')}>
            Пол
            {sortConfig.key === 'gender' &&
              (sortConfig.direction === 'ascending'
                ? ' ↑'
                : sortConfig.direction === 'descending'
                ? ' ↓'
                : '')}
            <div
              className={styles.resizer}
              onMouseDown={(event) => handleMouseDown(event, 2)}></div>
          </th>
          <th className={styles.th}>
            Номер телефона
            <div
              className={styles.resizer}
              onMouseDown={(event) => handleMouseDown(event, 3)}></div>
          </th>
          <th className={styles.th} onClick={() => handleSort('address.address')}>
            Адрес
            {sortConfig.key === 'address.address' &&
              (sortConfig.direction === 'ascending'
                ? ' ↑'
                : sortConfig.direction === 'descending'
                ? ' ↓'
                : '')}
            <div
              className={styles.resizer}
              onMouseDown={(event) => handleMouseDown(event, 4)}></div>
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <TableRow key={user.id} user={user} onClick={() => onClickUser(user)} />
        ))}
      </tbody>
    </table>
  );
};
