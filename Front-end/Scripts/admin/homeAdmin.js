window.onload = function(){
    info_usuario(usuario)
    logout()

}

var jsonusuario = localStorage.getItem("usuario");
var usuario = JSON.parse(jsonusuario);

function info_usuario(usuario){
    namespace = document.getElementById("user_name").textContent = usuario.nome
    rolespace = document.getElementById("user_role").textContent = "Adminstrador"
    console.log(usuario)
}

function logout(){
    let sair = document.getElementById("logout")
    sair.addEventListener("click", ()=>{
        location.href = "index.html"
    })

}