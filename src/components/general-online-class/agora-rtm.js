import { channel, client, displayName, rtmClient } from "./agora-functions";
let fromSelf = false;

export let handleUserJoined = async (MemberId) => {
    console.log("A new user joined channel", MemberId);
    addMemberToDom(MemberId)
    let members = await channel.getMembers()
    membersTotal(members)
    let {name} = await rtmClient.getUserAttributesByKeys(MemberId,['name'])
    addBotMessageToDom(`welcome to the room ${name}! 👋 `)
  };
  
export let addMemberToDom = async (MemberId) =>{
    let {name} = await rtmClient.getUserAttributesByKeys(MemberId,['name'])
    let memberWrapper = document.getElementById('member__list')
    let memberItem = ` <div class="member__wrapper" id="member__${name}__wrapper">
    <img src="https://templates.iqonic.design/hope-ui/pro/html/chat/assets/images/avatar/03.png" alt="profile" class="avatar-50 rounded-pill" loading="lazy"/>
    <span class="green__icon"></span>
        <p class="member_name">${name}</p>
    </div>`
   
    memberWrapper.insertAdjacentHTML("beforeend",memberItem)
}

export let removeMemberFromDom = async (MemberId) =>{
let {name} = await rtmClient.getUserAttributesByKeys(MemberId,['name'])
 let memberWrapper = document.getElementById(`member__${name}__wrapper`)
   addBotMessageToDom(`${name} left the room.`)
   
   memberWrapper.remove()
}

  //user left
 export let handleMemberLeft = async(MemberId) => {
    removeMemberFromDom(MemberId)
    let members = await channel.getMembers()
    membersTotal(members)
    };

  export  let membersTotal = async (members) => {
        let total = document.getElementById('members__count')
        total.innerText = members.length
       
     }

  export   let handleChannelMessage = async (messageData,MemberId) => {
        let data = JSON.parse(messageData.text)
        console.log("A new message recieved");
        if (data.type === 'chat') {
            addMessageToDom(data.displayName,data.message,fromSelf)
        }
     }
  export  let getMembers = async () => {
       let members = await channel.getMembers()
       membersTotal(members)
       for(let i = 0; i < members.length; i++){
       addMemberToDom(members[i])
      }
    }


  export  let sendMessage= async(e,value,setTextValue) => {
        e.preventDefault()
       let message = value
       channel.sendMessage({text:JSON.stringify({type:'chat',message:message,displayName:displayName})})
       fromSelf = true;
       addMessageToDom(displayName,message,fromSelf)
       setTextValue('')
     }

 export let addMessageToDom= async(name,message,fromSelf) => {
let messageWrapper = document.getElementById('messages')
let newMessage;
if (fromSelf){
newMessage = ` <div class="message__wrapper">  
<strong class="message__author">${name}</strong>
<div class="message__body">
    <p class="message__text">${message}</p>
</div>
</div>`
}else{
newMessage = ` <div class="messageFromPeer">  
<div class="message__wrapper">
<strong class="message__author">${name}</strong>
<div class="message__body">
    <p class="message__text">${message}</p>
</div>
</div>
</div>`
}
messageWrapper.insertAdjacentHTML("beforeend",newMessage)

let lastMessage = document.querySelector('#messages ,message__wrapper:last-child')
lastMessage && lastMessage.scrollIntoView()

     }

  export let addBotMessageToDom= async (botMessage) => {
        let messageWrapper = document.getElementById('messages')
        let newMessage = ` <div class="message__wrapper">
        <div class="message__body__bot">
            <strong class="message__author__bot">🤖 Go Bot</strong>
            <p class="message__text__bot">${botMessage}</p>
        </div>
    </div>`
        messageWrapper.insertAdjacentHTML("beforeend",newMessage)
        
        let lastMessage = document.querySelector('#messages ,message__wrapper:last-child')
        lastMessage && lastMessage.scrollIntoView()
        
             }
        



 export   let leaveChannel = async () => {
        await channel.leave()
        await client.logout()
    }

    window.addEventListener('beforeunload',leaveChannel)
   