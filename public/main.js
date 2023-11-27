const socket=io();

const chatfrom = document.getElementById("chat-form");

const chat=document.querySelector(".chat-messages")
let a;
// const urlParams = new URLSearchParams(location.search);

// for (const [key, value] of urlParams) {
//   console.log(`${key}:${value}`);
//   if (key.toLowerCase() === 'username') {
//       username = value;
//       break; // Break the loop after finding the username
//   }
// }

const {username,room}=Qs.parse(location.search,{
  ignoreQueryPrefix:true
})
const roomy=document.getElementById("room-name")
roomy.innerText=room;

// console.log(username,room);

 
socket.emit("joinroom",{username,room})




socket.on("message",message=>{
    console.log(message);

    if(message.text==="Welcome to this ChatWhat!"){

outputmessage(message);
    }
    else{
      outputs(message);
    outputmessage(message);
  }
    chat.scrollTop=chat.scrollHeight;    
})


chatfrom.addEventListener("submit",e=>{
    e.preventDefault();

    const msg= e.target.elements.msg.value;
    // console.log(msg);
    
  socket.emit("chatmessage",msg);
  e.target.elements.msg.value='';
  e.target.elements.msg.focus();
})



function outputmessage(message){

    const div= document.createElement('div');
   div.classList.add('message');
   

    div.innerHTML=`<p class="meta">${message.username}<span>${message.time}</span></p>
   <p class="text">  
   ${message.text}
   </p>`;
 
  
   document.querySelector(".chat-messages").appendChild(div);
  

}
// let count=0;
// function outputs(mess){
// const li= document.createElement('li');

// li.setAttribute("id","users");
// console.log(mess.username);
// if(mess.username!="ChatWhat" && count<=1){
// li.innerHTML=mess.username ;
// document.getElementById("users").appendChild(li); 
// count++;
// }


// }
let userSet = new Set();

function outputs(mess) {
  if (mess.username !== "ChatWhat" && !userSet.has(mess.username)) {
    const li = document.createElement('li');
    li.setAttribute("id", "users");
    li.innerHTML = mess.username;

    document.getElementById("users").appendChild(li);

    // Add the username to the set to track uniqueness
    userSet.add(mess.username);
  }
}