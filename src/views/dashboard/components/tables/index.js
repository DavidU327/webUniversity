import React from 'react';
import propTypes from 'prop-types';
import { styles } from './styles';

function Table({ firstLabel, secondLabel }) {
  return (
    <div style={styles.container}>
      <div style={styles.containerColumn}>
        <span style={styles.title}>{firstLabel}</span>
        <span style={styles.title}>{secondLabel}</span>
      </div>

      <div style={styles.containerColumn}>
        <span style={styles.text}>Juan Pablo David</span>
        <span style={styles.text}>10/24/2021</span>
      </div>

    </div>
  );
}

Table.propTypes = {
  firstLabel: propTypes.string.isRequired,
  secondLabel: propTypes.string.isRequired,
};

export default Table;
