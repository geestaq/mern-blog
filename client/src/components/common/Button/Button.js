import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Button.scss';

const Button = ({ variant = '', children, ...otherProps }) => (
  <Link { ...otherProps } className={ `button button--${variant}`}>
    { children }
  </Link>
);

Button.propTypes = {
  variant: PropTypes.string.isRequired,
};

export default Button;
