import '@utils/polyfill';
import React from 'react';
import { render } from 'react-dom';
import Root from './Root';
import '@styles/index.scss';

const init = () => {
  render(<Root />, document.getElementById('root'));
};

init();
