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
    let pathImg = '../media/images/error-img.gif'
    switch (true) {
        case textoEmail.trim() === "" && textoSenha.trim() === "":
            message = "Atenção, o preenchimento de todos os campos é obrigatório."
            prompt_login(message, pathImg)
            break

        case textoEmail.trim() === "":
            message = "O campo de e-mail não pode estar vazio."
            prompt_login(message, pathImg)
            break

        case textoSenha.trim() === "":
            message = "O campo de senha não pode estar vazio."
            prompt_login(message, pathImg)
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
        let response = await axios.post(`http://localhost:8080/auth/login`, data)
        let token = response.data.token

        const api = await axios.create({
            baseURL:`http://localhost:8080`,
            headers: {
            'Authorization': `Bearer ${token}`
            }

        })

    let responseUser = await api.get(`/usuarios/email/${textoEmail}`)

    let roles = responseUser.data.roleUsuario
    let usuario = responseUser.data

    localStorage.setItem('usuario', JSON.stringify(usuario))
    localStorage.setItem('roles', JSON.stringify(roles))
    localStorage.setItem('token', JSON.stringify(token))

    if(response.status === 200){
        if (roles[0] === 'ROLE_ADMIN'){
            location.href = "../Pages/admin/homeAdmin.html"
        }
        else {
            location.href = "../Pages/usuario/home_user.html"
        }
    }

    }catch(error){
        if (error.response.data.message === "Credenciais inválidas." || error.response.data.message === "Campos inválidos." || error.response.status == 403){
            prompt_login("Credênciais inválidas.", "../media/images/error-img.gif")
            console.log(error.response.data.message)
        }
        else{
            alert("Ocorreu um erro no sistema, tente novamente mais tarde")
        }
    }
}

function prompt_login(messagem, pathImg){
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `
    var firstPrompt = `
    <div class="prompt" id="prompt">
        <img src="${pathImg}" style="width: 30%">
        <span class="prompt_text">${messagem}</span>
        <div class="btns">
            <button class="btn_p" id="btn_cont">OK</button>
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
