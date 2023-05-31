import AgoraRTC from 'agora-rtc-sdk-ng';
import AgoraRTM from 'agora-rtm-sdk'
import { useRef } from 'react';
import { addBotMessageToDom, getMembers, handleChannelMessage, handleMemberLeft, handleUserJoined } from './agora-rtm';

export const APP_ID = "63694ae5c5e84029964c8df8798434ee";
export let uid = String(Math.floor(Math.random() * 10000));
export let token = null;

export let client;


export let queryString = window.location.search
export let urlParams = new URLSearchParams(queryString)
export let roomID = urlParams.get('roomId');

export let localTracks = [];
export let remoteUsers = {};

export let localScreenTracks;
export let sharingScreen = false;

export let rtmClient;
export let channel;



export let constraints = {
    encoderConfig:{
        width:{min:640,ideal:1920,max:1920},
        height:{min:480,ideal:1080,max:1080},
    }
}
export let displayName = sessionStorage.getItem('display_name')
const displayFrame = document.getElementById('stream__box')
const videoFrames =  document.getElementsByClassName('video__container')
  let userIdInDisplayFrame = null;

export const expandVideoFrame = (e) => {
    
    const streamsContainer = document.getElementById('streams__container');
     const child = displayFrame?.children[0];

    if (child) {
      streamsContainer.appendChild(child);
   }

    displayFrame.style.display = 'block';
    displayFrame?.appendChild(e.currentTarget);
    userIdInDisplayFrame = e.currentTarget.id;

    for (let i = 0; i < videoFrames.length; i++) {
      if (videoFrames[i] !== userIdInDisplayFrame) {
        videoFrames[i].style.height = '100px';
        videoFrames[i].style.width = '100px';
      }
    }
  };

 export let hideDisplayFrame = () =>{
    userIdInDisplayFrame = null
    displayFrame.style.display = 'none'
    let child = displayFrame?.children[0]
    document.getElementById('streams__container').appendChild(child)
  
    for(let i = 0; videoFrames.length > i; i++){
      videoFrames[i].style.height = '300px'
      videoFrames[i].style.width = '300px'
    }
  }

export let joinRoomInit = async () => {   
    rtmClient =  client = await AgoraRTM.createInstance(APP_ID);
    await rtmClient.login({ uid, token });
     await rtmClient.addOrUpdateLocalUserAttributes({name:displayName})
  
    channel = rtmClient.createChannel(roomID);
    await channel.join();
  
      client = await AgoraRTC.createClient({mode:'rtc', codec:'vp8'}); 
      await client.join(APP_ID,roomID,token,uid);
  
      client.on("user-published", handleUserPublished);
      client.on("user-left", handleUserLeft);
      channel.on("MemberJoined", handleUserJoined);
      channel.on("ChannelMessage", handleChannelMessage);
      channel.on("MemberLeft", handleMemberLeft);
     
  
       getMembers()
      addBotMessageToDom(`welcome to the room ${displayName}! 👋 `)
  
      joinStream()
   };

   let joinStream = async () => {
    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks({},constraints)

    let player = `<div class="video__container" id="user-container-${uid}">
 <div class="video-player" id="user-${uid}"></div>
</div>
`
document.getElementById('streams__container').insertAdjacentHTML('beforeend',player)
document.getElementById(`user-container-${uid}`).addEventListener('click',expandVideoFrame)
localTracks[1].play(`user-${uid}`)
await client.publish([localTracks[0],localTracks[1]])
}
//other users
let handleUserPublished = async (user, mediaType) => {
  remoteUsers[user.uid] = user
  await client.subscribe(user,mediaType)

  let player = document.getElementById(`user-container-${user.uid}`)
  if (player == null) {
    player = `<div class="video__container" id="user-container-${user.uid}">
  <div class="video-player" id="user-${user.uid}"></div>
 </div>`
 document.getElementById('streams__container').insertAdjacentHTML('beforeend',player)
 document.getElementById(`user-container-${user.uid}`).addEventListener('click',expandVideoFrame)


 if (displayFrame.style.display) {
  let videoFrame = document.getElementById(`user-container-${user.uid}`)
  videoFrame.style.height = '100px'
  videoFrame.style.width = '100px'
 }
  }
  if (mediaType === 'video') {
    user.videoTrack.play(`user-${user.uid}`)
  }
  if (mediaType === 'audio') {
    user.audioTrack.play()
  }


};
  
let handleUserLeft = (user) => {
    delete remoteUsers[user.uid]
  document.getElementById(`user-container-${user.uid}`).remove();
  if (userIdInDisplayFrame === `user-container-${user.uid}`) {
    displayFrame.style.display = 'none'
    let videoFrames =  document.getElementsByClassName('video__container')
  for(let i = 0; videoFrames.length > i; i++){
    videoFrames[i].style.height = '300px'
    videoFrames[i].style.width = '300px'
  
    };
  }
  }


export let toggleCamera = async (e) =>{
  let button = e.currentTarget;

  if (localTracks[1].muted) {
    await localTracks[1].setMuted(false)
    button.classList.add('active')
  }else{
    await localTracks[1].setMuted(true)
    document.getElementById('camera-btn').classList.remove('active')
  }

   
}
export let toggleMic = async (e) =>{
  let button = e.currentTarget;

  if (localTracks[0].muted) {
    await localTracks[0].setMuted(false)
    button.classList.add('active')
  }else{
    await localTracks[0].setMuted(true)
    document.getElementById('mic-btn').classList.remove('active')
  }

   
}

let switchToCamera = async(localScreenTracks) => {
    let player = `<div class="video__container" id="user-container-${uid}">
     <div class="video-player" id="user-${uid}"></div>
    </div>`
    displayFrame.insertAdjacentHTML('beforeend',player)
   
    await localTracks[1].setMuted(true)
    document.getElementById('screen-btn').classList.remove('active')
   
    localTracks[1].play(`user-${uid}`)
   await client.publish([localTracks[1]])
   await client.unpublish([localScreenTracks])
   
   
   }

export let toggleScreen = async (e) =>{
let screenBtn = e.currentTarget;
let cameraBtn = document.getElementById('camera-btn')
if (!sharingScreen) {
  sharingScreen = true
  screenBtn.classList.add('active')
  cameraBtn.classList.remove('active')
   
  localScreenTracks = await AgoraRTC.createScreenVideoTrack()
  document.getElementById(`user-container-${uid}`).remove();
  displayFrame.style.display = 'block'
  let player = `<div class="video__container" id="user-container-${uid}">
  <div class="video-player" id="user-${uid}"></div>
 </div>`
 displayFrame.insertAdjacentHTML("beforeend",player);
 document.getElementById(`user-container-${uid}`).addEventListener('click', expandVideoFrame);
 userIdInDisplayFrame = `user-container-${uid}`
 localScreenTracks.play(`user-${uid}`)

 await client.unpublish([localTracks[1]])
 await client.publish([localScreenTracks])

let videoFrames =  document.getElementsByClassName('video__container')
 for(let i = 0; videoFrames.length > i; i++){
  if(videoFrames[i] !== userIdInDisplayFrame){
  videoFrames[i].style.height = '100px'
  videoFrames[i].style.width = '100px'
}
 }
}else{
 sharingScreen = false
  document.getElementById(`user-container-${uid}`).remove();
  switchToCamera(localScreenTracks)
}

}