import React, { useEffect, useRef, useState } from 'react'
import { generalOnlineClassLocations } from '../../router/spm-path-locations';
import "./css/room.css";
import "./css/main.css";
import StreamContainer from './stream-container';
import { displayName, joinRoomInit, roomID, toggleCamera, toggleMic, toggleScreen } from './agora-functions';
import { useHistory } from 'react-router';
import { sendMessage } from './agora-rtm';

const OnlineClassRoom = () => {
    const displayFrameRef = useRef(null);
    const history = useHistory();
    const [textValue, setTextValue] = useState('');

    const [activeMemberContainer, setActiveMemberContainer] = useState(true);
    const [activeChatContainer, setActiveChatContainer] = useState(true);
    const messagesContainerRef = useRef(null);

    useEffect(() => {
      const messagesContainer = messagesContainerRef.current;
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, []);
   
    if(!roomID){
        history.push(generalOnlineClassLocations.lobby)
    }
    
    if (!displayName) {
        history.push(generalOnlineClassLocations.lobby)
    }

    useEffect(() => {
        joinRoomInit();
    }, [])
    
    
  return (
    <>
    <header id="nav">
    <div className="nav--list">
         <button id="members__button" onClick={()=>setActiveMemberContainer(!activeMemberContainer)} >
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"  fill="white"><path d="M24 18v1h-24v-1h24zm0-6v1h-24v-1h24zm0-6v1h-24v-1h24z"/><path d="M24 19h-24v-1h24v1zm0-6h-24v-1h24v1zm0-6h-24v-1h24v1z"/></svg>
         </button>
         <a href={generalOnlineClassLocations.lobby}>
             <h3 id="logo">
                 <img src="https://t4.ftcdn.net/jpg/03/16/32/23/240_F_316322355_m8FC5EDRun5JOAAHD94CvW1uUScY5IFh.jpg" alt="Site Logo"/>
                 <span>GoChat</span>
             </h3>
         </a>
    </div>

     <div id="nav__links">
         <button id="chat__button" onClick={()=>setActiveChatContainer(!activeChatContainer)}><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" fill="#ede0e0" clipRule="evenodd"><path d="M24 20h-3v4l-5.333-4h-7.667v-4h2v2h6.333l2.667 2v-2h3v-8.001h-2v-2h4v12.001zm-15.667-6l-5.333 4v-4h-3v-14.001l18 .001v14h-9.667zm-6.333-2h3v2l2.667-2h8.333v-10l-14-.001v10.001z"/></svg></button>
       
         <a className="nav__link" id="create__room__btn" href="lobby.html">
             Create Room
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ede0e0" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>
         </a>
     </div>
 </header>

 <main className="general__container">
     <div id="room__container">

         <section id="members__container" style={{display: activeMemberContainer ? 'block' : 'none'}}>

         <div id="members__header">
             <p>Participants</p>
             <strong id="members__count">0</strong>
         </div>

         <div id="member__list">
         
            
         </div>

         </section>
         <section id="stream__container">
<div id="stream__box" ref={displayFrameRef}></div>


<StreamContainer/>






             <div className="stream__actions">
                 <button id="camera-btn" className="active" onClick={(e)=> toggleCamera(e)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M16 18c0 1.104-.896 2-2 2h-12c-1.105 0-2-.896-2-2v-12c0-1.104.895-2 2-2h12c1.104 0 2 .896 2 2v12zm8-14l-6 6.223v3.554l6 6.223v-16z"/></svg>
                 </button>
                 <button id="mic-btn" className="active" onClick={(e)=> toggleMic(e)}>
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c1.103 0 2 .897 2 2v7c0 1.103-.897 2-2 2s-2-.897-2-2v-7c0-1.103.897-2 2-2zm0-2c-2.209 0-4 1.791-4 4v7c0 2.209 1.791 4 4 4s4-1.791 4-4v-7c0-2.209-1.791-4-4-4zm8 9v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2h2v2c0 3.309 2.691 6 6 6s6-2.691 6-6v-2h2zm-7 13v-2h-2v2h-4v2h10v-2h-4z"/></svg>
                 </button>
                 <button id="screen-btn"onClick={(e)=> toggleScreen(e)}>
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 1v17h24v-17h-24zm22 15h-20v-13h20v13zm-6.599 4l2.599 3h-12l2.599-3h6.802z"/></svg>
                 </button>
               
                 <button id="leave-btn" onClick={()=>history.goBack()}> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"/></svg>
            </button>
                
             </div>
         </section>

         <section id="messages__container" style={{display: activeChatContainer ? 'block' : 'none'}}>

             <div id="messages" ref={messagesContainerRef}>
                

                 
             </div>

             <form id="message__form" onSubmit={(e)=>sendMessage(e,textValue, setTextValue)}>
                 <input type="text" value={textValue} onChange={(e)=>setTextValue(e.target.value)}  placeholder="Send a message...." />
             </form>

         </section>
     </div>
 </main>

 </>

  )
}

export default OnlineClassRoom