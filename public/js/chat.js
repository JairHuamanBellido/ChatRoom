let socket = io();
const messageInput = document.getElementById('field-message');
const containerMessage = document.getElementById('container-message');
const username = document.getElementsByClassName("header-user")[0].getAttribute("id");
const urlAvatar = document.getElementById("myAvatar").getAttribute("src");
const allUsersOnline = document.getElementsByClassName("all-user-connected")[0];
const sendMessage = () => {
    if (messageInput.value != "") {
        socket.emit('send message', { message: messageInput.value, username: username });
        messageInput.value = "";
    }
}
const typeKeyboard = (e) => {
    if (e.keyCode == 13) {
        sendMessage();
    }
}

socket.emit('I am in room', { username: username, avatar: urlAvatar })


socket.on('display message', (data) => {
    console.log("Username: " + data.username);
    console.log("Mensaje : " + data.message);
    let messageContainer = document.createElement('div');
    messageContainer.setAttribute("class", "message-container");
    messageContainer.innerHTML = `
        <p>${data.username}: ${data.message}</p>
    `

    containerMessage.appendChild(messageContainer);
})

socket.on('New member', (data) => {
    let newUserContainer = document.createElement('div');
    newUserContainer.setAttribute("id", data.id);
    newUserContainer.setAttribute("class", data.username + " newUser");

    newUserContainer.innerHTML = `
        <img src="${data.avatar}" width="32" height="32">
        <p class="username-sb> ${data.username} </p>
    `;

    allUsersOnline.appendChild(newUserContainer);


})

socket.on('get Users connected', (data) => {
    console.log(data.allUser);

    data.allUser.reduce((prev, actual) => {
        console.log(actual.avatar)
        let newUserContainer = document.createElement('div');
        newUserContainer.setAttribute("id", actual.id);
        newUserContainer.setAttribute("class", actual.username + " newUser");

        newUserContainer.innerHTML = `
            <img src="${actual.avatar}" width="48" height="48">
            <p class="username-sb"> ${actual.username} </p>
        `;

        allUsersOnline.appendChild(newUserContainer);


    }, "")

})



socket.on('someone left', (data) => {
    console.log(data.username + " salió");
    document.getElementById(data.username).remove();
})