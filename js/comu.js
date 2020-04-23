// PS! Replace this with your own channel ID
// If you use this channel ID your app will stop working in the future
const CLIENT_ID = 'VzxtynDcTZuQcLCj';

function getRandomName() {
  var personame=document.getElementById("name").value
  return (personame);
}
const drone = new ScaleDrone(CLIENT_ID, {
  data: { // Will be sent out as clientData via events
    name: getRandomName(),
    color: getRandomColor(),
  },
});

let members = [];

drone.on('open', error => {
  if (error) {
    return console.error(error);
  }
  console.log('Successfully connected to Scaledrone');

  const room = drone.subscribe('observable-globalpublicroom',{
                                                  historyCount:100
                                                });
  room.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined room');
  });

  room.on('members', m => {
    members = m;
    updateMembersDOM();
  });

  room.on('member_join', member => {
    members.push(member);
    updateMembersDOM();
  });

  room.on('member_leave', ({id}) => {
    const index = members.findIndex(member => member.id === id);
    members.splice(index, 1);
    updateMembersDOM();
  });

  room.on('data', (text, member) => {
    
    if (member) {
      addMessageToListDOM(text, member);
    } else {
      // Message is from server
    }
  });
  room.on('history_message', (text, member) => {

      addMessageToListDOM(text.data, member);

  });
});

drone.on('close', event => {
  console.log('Connection was closed', event);
});

drone.on('error', error => {
  console.error(error);
});

function myYourName() {
  var x = document.getElementsById("label1")
  x[0].innerHTML=personame;
}
function getRandomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

//------------- DOM STUFF

const DOM = {
  membersCount: document.querySelector('.members-count'),
  membersList: document.querySelector('.members-list'),
  messages: document.querySelector('.messages'),
  input: document.querySelector('.message-form__input'),
  form: document.querySelector('.message-form'),
  image: document.querySelector('.fileupload'),  
};

DOM.form.addEventListener('submit', sendMessage);


function sendMessage() {
  const value = DOM.input.value;
  if (value === '') {
    return;
  }
  DOM.input.value = '';
  drone.publish({
    room: 'observable-globalpublicroom',
    message: {data:value,from:getRandomName()},
  });
}



function updateMembersDOM() {
  DOM.membersCount.innerText = `[${members.length}] users online`;
  DOM.membersList.innerHTML = '';
  members.forEach(member =>
    DOM.membersList.appendChild(createMemberElement(member))
  );
}
function createMemberElement(a){
  
    var d = document.createElement("div")
    var s = document.createElement("div") 
    s.innerHTML= "[ "+a.clientData.name+" ]"
    d.appendChild(s)
    return d
}
function createMessageElement(text, member) {
  const el = document.createElement('div');
  el.innerHTML +=`<span>[${member}]</span>`
  el.appendChild(document.createTextNode(text));
  el.className = 'message';
  return el;
}

function addMessageToListDOM(text, member) {
  const el = DOM.messages;
  const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
  el.appendChild(createMessageElement(text.data, text.from));
  if (wasTop) {
    el.scrollTop = el.scrollHeight - el.clientHeight;
  }
}
