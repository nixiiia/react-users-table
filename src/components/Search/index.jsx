import React from 'react';
import styles from './Search.module.scss';

export const Search = ({ searchTerm, handleSearch }) => {
  return (
    <div className={styles.root}>
      <input className={styles.input} value={searchTerm} onChange={handleSearch} />
    </div>
  );
};
