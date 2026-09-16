import React from 'react';
import propTypes from 'prop-types';
import FeatherIcon from 'feather-icons-react';
import { styles } from './styles';

function Card({ title, background, nameIcon, colorIcon, quantity }) {
  return (
    <div style={styles.container}>
      <span style={styles.title}>{title}</span>
      <div style={styles.containerInfo}>
        <div style={{ ...styles.containerIcon, backgroundColor: background }}>
          <FeatherIcon icon={nameIcon} size={30} color={colorIcon} />
        </div>
        <span style={styles.text}>{quantity}</span>
      </div>
    </div>
  );
}

Card.propTypes = {
  title: propTypes.string.isRequired,
  background: propTypes.string.isRequired,
  nameIcon: propTypes.string.isRequired,
  colorIcon: propTypes.string.isRequired,
  quantity: propTypes.number.isRequired,
};

export default Card;
