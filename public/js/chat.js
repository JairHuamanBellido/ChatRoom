let socketId;
let lastIdSocket;
let socket = io();
const messageInput = document.getElementById('field-message');
const containerMessage = document.getElementById('container-message');
const username = document.getElementsByClassName("header-user")[0].getAttribute("id");
const urlAvatar = document.getElementById("myAvatar").getAttribute("src");
const allUsersOnline = document.getElementsByClassName("all-user-connected")[0];


//AddZero   
const addZeroTime = (time)=>{


    return(time<10)? `0${time}`:time;
}



// ALL FUNCTIONS DOM
const sendMessage = () => {
    if (messageInput.value != "") {
        socket.emit('send message', { message: messageInput.value, username: username, avatar: urlAvatar });
        messageInput.value = "";
        messageInput.focus();
    }
}
const typeKeyboard = (e) => {
    if (e.keyCode == 13) {
        sendMessage();
    }
}

const isMyMessage = (id) => {
    return (id === socketId);
}


socket.emit('I am in room', { username: username, avatar: urlAvatar })



socket.on('display message', (data) => {


    let messageContainer = document.createElement('div');

    if (lastIdSocket === data.id) {

        if (isMyMessage(data.id)) {
            messageContainer.setAttribute("class", "message-container myMessageRepeat");
            messageContainer.innerHTML = `
            
                <div class="message-info">
                    <p>${data.message}</p>
                    <p class="timeMessage">${addZeroTime(new Date().getHours())}:${addZeroTime(new Date().getMinutes())}</p>
                </div>
    
            `
        }
        else {
            messageContainer.setAttribute("class", "message-container notMyMessageRepeat");
            messageContainer.innerHTML = `
                <div class="message-info">
                    <h2>${data.username} </h2>
                    <p>${data.message}</p>
                    <p class="timeMessage">${new Date().getHours()}:${new Date().getMinutes()}</p>
                </div>    
            `
        }



    }
    else {

        if (isMyMessage(data.id)) {
            messageContainer.setAttribute("class", "message-container myMessage");
            messageContainer.innerHTML = `
            <div class="message-avatar">
                <img src="${data.avatar}" width="48" height="48">
            </div>

            <div class="message-info">
                <p>${data.message}</p>
                <p class="timeMessage">${new Date().getHours()}:${new Date().getMinutes()}</p>
            </div>

        `
        }
        else{
            messageContainer.setAttribute("class", "message-container notMyMessage");
            messageContainer.innerHTML = `
            <div class="message-avatar">
                <img src="${data.avatar}" width="48" height="48">
            </div>

            <div class="message-info">
                <h2>${data.username} </h2>
                <p>${data.message}</p>
                <p class="timeMessage">${new Date().getHours()}:${new Date().getMinutes()}</p>
            </div>

        `
        }
    }



    lastIdSocket = data.id;


    containerMessage.insertBefore(messageContainer, containerMessage.firstChild);
    containerMessage.scrollTop = (containerMessage.scrollHeight) - 64;
})

socket.on('New member', (data) => {
    let newUserContainer = document.createElement('div');
    newUserContainer.setAttribute("id", data.id);
    newUserContainer.setAttribute("class", data.username + " newUser");

    newUserContainer.innerHTML = `
        <img src="${data.avatar}" width="48" height="48">
        <p class="username-sb"> ${data.username} </p>
    `;

    allUsersOnline.appendChild(newUserContainer);


})

socket.on('set All Data', async (data) => {

    // Get ID SOCKET
    socketId = data.id;

    data.allUser.reduce((prev, actual) => {
        let newUserContainer = document.createElement('div');
        newUserContainer.setAttribute("id", actual.id);
        newUserContainer.setAttribute("class", actual.username + " newUser");

        newUserContainer.innerHTML = `
            <img src="${actual.avatar}" width="48" height="48">
            <p class="username-sb"> ${actual.username} </p>
        `;

        allUsersOnline.appendChild(newUserContainer);


    }, "");



})



socket.on('someone left', (data) => {
    console.log(data.username + " salió");
    document.getElementById(data.username).remove();
})

