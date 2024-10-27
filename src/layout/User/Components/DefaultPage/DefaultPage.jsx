import React from 'react'
import Header from '../Header/Header';

export const DefaultPage=({children})=> {
  return (
    <div>
        <Header/>
        {children}
    </div>
  )
};

export const DefaultPageNoHeader=({children})=>{
  return(
    <div>
      {children}
    </div>
  )
};
