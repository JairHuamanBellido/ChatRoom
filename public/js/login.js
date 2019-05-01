const imgAvatarField = document.getElementById('input-avatar');
const img =  document.getElementById("avatar");
const keyupE = (e)=>{

    
    img.setAttribute("src",imgAvatarField.value);
    if(imgAvatarField.value == ""){
        img.setAttribute("src", "https://avatarfiles.alphacoders.com/132/thumb-132712.jpg");
    }
}