
// document.addEventListener("DOMContentLoaded", function() {
// // Alerta ao abrir a página
// alert("Bem vindo ao NextSchema!");

// // Função a ser executada quando o botão for clicado
// document.getElementById("botao-entrar").onclick = function() {
//     // Captura o valor do campo de e-mail
//     let email = document.getElementById("texto-email").value;
//     // Exibe o e-mail no console
//     console.log(email);
// };
window.onload = function(){
    localStorage.clear();
}
document.getElementById("botaoEntrar").addEventListener("click", () => {
    capturar_dados();
});

let pagina_por_role = {
    0: "admin/homeAdmin.html",
    1: "landing_zone/homeUser.html",
    2: "bronze/bz_visualizar_metadata.html",
}

function capturar_dados() {
    var textoEmail = document.getElementById("username").value;
    var textoSenha = document.getElementById("password").value;
    
    verificar_campos(textoEmail,textoSenha);
    validar_dados(textoEmail,textoSenha);
}

function verificar_campos(textoEmail, textoSenha){
    switch (true) {
        case textoEmail.trim() === "" && textoSenha.trim() === "":
            alert("Por favor, preencha os campos.");
            break
    
        case textoEmail.trim() === "":
            alert("Por favor, insira o Email.");
            break

        case textoSenha.trim() === "":
            alert("Por favor, insira a Senha.");
            break
        };
}

async function validar_dados(textoEmail,textoSenha){
    let data = {
        email: textoEmail,
        senha: textoSenha
    }
    try {
        let response = await axios.post(`http://localhost:8080/usuarios/login`, data)
        let roles = [0,1,2]
        usuario = response.data
        localStorage.setItem('usuario', JSON.stringify(usuario))
        localStorage.setItem('roles', JSON.stringify(roles))

        if(response.status === 200){
            location.href = pagina_por_role[roles[0]]
            console.log(location.href)
            //selecionar_pagina()
        }else{
            alert("Um erro ocorreu no sistema, tente novamente mais tarde.")
        }

    }catch(error){
        console.error(error);
    }
    console.log(data)
}

function selecionar_pagina(){
    //Dar um get no endpoint pra receber qual é o id

}

