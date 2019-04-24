const imgAvatarField = document.getElementById('input-avatar');
const img =  document.getElementById("avatar");
const keyupE = (e)=>{

    
    img.setAttribute("src",imgAvatarField.value);
    if(imgAvatarField.value == ""){
        img.setAttribute("src", "https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/99/UP2538-CUSA05620_00-AV00000000000118//image?_version=00_09_000&platform=chihiro&w=720&h=720&bg_color=000000&opacity=100");
    }
}