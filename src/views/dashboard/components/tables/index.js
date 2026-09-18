import React from 'react';
import propTypes from 'prop-types';
import { styles } from './styles';

function Table({ firstLabel, secondLabel, items }) {
  return (
    <div style={styles.container}>
      <div style={styles.containerColumn}>
        <span style={styles.title}>{firstLabel}</span>
        <span style={styles.title}>{secondLabel}</span>
      </div>
      {items.map((item) => (
        <div style={styles.containerColumn} key={item.id}>
          <span style={styles.text}>{item.label}</span>
          <span style={styles.text}>{item.value}</span>
        </div>
      ))}
    </div>
  );
}

Table.propTypes = {
  firstLabel: propTypes.string.isRequired,
  secondLabel: propTypes.string.isRequired,
  items: propTypes.array.isRequired,
};

export default Table;
