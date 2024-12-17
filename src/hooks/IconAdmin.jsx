import React from 'react';
import svg from '../assets/images/king_svg.svg';
import { Avatar } from '@mui/material';

export default function IconAdmin({ image }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Avatar
        src={image}
        style={{ width: 40, height: 40 }} 
      />
      <img
        src={svg}
        alt="Admin Icon"
        style={{
          position: 'absolute',
          top: '-15px', 
          right: '10px',
          width: 20, 
          height: 20,
        }}
      />
    </div>
  );
}
