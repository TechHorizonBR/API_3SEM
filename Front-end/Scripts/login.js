window.onload = function(){
    localStorage.clear();
}

function capturar_dados() {
    var textoEmail = document.getElementById("username").value;
    var textoSenha = document.getElementById("password").value;

    if (verificar_campos(textoEmail,textoSenha)){
        validar_dados(textoEmail,textoSenha);
    }
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


async function buscar_roles(token,email){
    let response = await axios.get(`http://localhost:8080/usuarios/email/${email}`,{
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    console.log(response)
}
async function validar_dados(textoEmail,textoSenha){
    let data = {
        email: textoEmail,
        senha: textoSenha
    }
    try {
        let response = await axios.post(`http://localhost:8080/auth/login`, data)
        let token = response.data.token

        const api = await axios.create({
            baseURL:`http://localhost:8080`,
            headers: {
            'Authorization': `Bearer ${token}`
        }

    })
    console.log(token)
    let responseUser = await api.get(`/usuarios/email/${textoEmail}`)



    console.log(responseUser)
    console.log("dkjsaldaj")
        let roles = responseUser.data.roleUsuario
        console.log(token)
        usuario = responseUser.data
        localStorage.setItem('usuario', JSON.stringify(usuario))
        localStorage.setItem('roles', JSON.stringify(roles))

        if(response.status === 200){


            if (roles[0] === 'ROLE_ADMIN'){
                location.href = "../Pages/admin/homeAdmin.html"
            }
            else {
                location.href = "../Pages/usuario/home_user.html"
            }
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
