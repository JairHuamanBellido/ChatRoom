let socket = io();
const messageInput = document.getElementById('field-message');
const containerMessage = document.getElementById('container-message');
const username = document.getElementsByClassName("header-user")[0].getAttribute("id");
const sendMessage = () => {
    if (messageInput.value != "") {
        socket.emit('send message', { message: messageInput.value, username: username });
        messageInput.value ="";
    }
}

socket.on('display message', (data)=>{
    console.log("Username: "+ data.username);
    console.log("Mensaje : "+ data.message );
    let messageContainer =  document.createElement('div');
    messageContainer.innerHTML = `
        <p>${data.username}: ${data.message}</p>
    `

    containerMessage.appendChild(messageContainer);
})

const typeKeyboard = (e)=>{
    if(e.keyCode == 13){
        sendMessage();
    }
}