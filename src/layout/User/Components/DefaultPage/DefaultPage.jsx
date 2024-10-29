import React from 'react';
import Header from '../Header/Header';

export const DefaultPage = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export const DefaultPageNoHeader = ({ children }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#F4F1EA',
      overflowY: 'auto',
      padding: '20px' 
    }}>
      {children}
    </div>
  );
};
