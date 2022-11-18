import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SingleSticker from './SingleSticker';
import Carousel from './Carousel';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Carousel />
  </React.StrictMode>
);