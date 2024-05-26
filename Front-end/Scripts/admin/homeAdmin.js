window.onload = function(){
    info_usuario(usuario)
    logout()
}

let usuario = JSON.parse(localStorage.getItem("usuario"));

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