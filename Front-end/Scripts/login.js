
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

let pagina_por_role = {
    "ROLE_ADMIN": "../Pages/admin/homeAdmin.html",
    "ROLE_LZ": "../Pages/landing_zone/homeUser.html",
    "ROLE_BRONZE": "../Pages/bronze/bz_visualizar_metadata.html",
    "ROLE_SILVER": "#"
}

function capturar_dados() {
    var textoEmail = document.getElementById("username").value;
    var textoSenha = document.getElementById("password").value;
    
    if (verificar_campos(textoEmail,textoSenha)){
    validar_dados(textoEmail,textoSenha);}
}

function verificar_campos(textoEmail, textoSenha){
    validado = false
    switch (true) {
        case textoEmail.trim() === "" && textoSenha.trim() === "":
            message = "Por favor, preencha os campos"    
            prompt_login(message)
            break
    
        case textoEmail.trim() === "":
            message = "Por favor, insira o Email"    
            prompt_login(message)
            break

        case textoSenha.trim() === "":
            message = "Por favor, insira a Senha"    
            prompt_login(message)
            break

       default:
            validado = true;
            return validado 

        };
}

async function validar_dados(textoEmail,textoSenha){
    let data = {
        email: textoEmail,
        senha: textoSenha
    }
    try {
        let response = await axios.post(`http://localhost:8080/usuarios/login`, data)
        let roles = response.data.roleUsuario
        console.log(roles)
        usuario = response.data
        localStorage.setItem('usuario', JSON.stringify(usuario))
        localStorage.setItem('roles', JSON.stringify(roles))

        if(response.status === 200){
            location.href = pagina_por_role[roles[0]]
            console.log(location.href)
        }

    }catch(error){
    if (error.response.data.message === "Credenciais inválidas." || error.response.data.message === "Campos inválidos."){
        prompt_login("Credenciais inválidas")
        console.log(error.response.data.message)}
    else{
        alert("Ocorreu um erro no sistema, tente novamente mais tarde")
    }
}
}
function prompt_login(message){
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `

    var firstPrompt = `
    <div class="prompt" id="prompt">
        <span class="prompt_text">${message}</span>
        <div class="btns">
            <button class="btn_p" id="btn_cont">Ok</button>
        </div>
    </div>
    `

    document.body.insertAdjacentHTML('beforeend', back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML('beforeend', firstPrompt);
    let prompt = document.getElementById("prompt");

    document.getElementById("btn_cont").addEventListener("click", ()=>{
            prompt.remove();
            document.getElementById("back_prompt").remove()})
}