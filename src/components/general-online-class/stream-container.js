import React, { useEffect, useRef } from 'react';
import { expandVideoFrame, hideDisplayFrame } from './agora-functions';

const StreamContainer = () => {
const displayFrame = document.getElementById('stream__box')
  const videoFrames = document.getElementsByClassName('video__container')
  useEffect(() => {
  for(let i = 0; videoFrames.length > i; i++){
    videoFrames[i].addEventListener('click', expandVideoFrame)
  }
 displayFrame?.addEventListener('click', hideDisplayFrame)
  }, [])
  
 


  return (
      <div id="streams__container">
      
      </div>
    
  );
};

export default StreamContainer;
