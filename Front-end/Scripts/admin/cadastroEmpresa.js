window.onload = () => {
    generateTable()
    info_usuario(usuario)
};

let usuario = JSON.parse(localStorage.getItem("usuario"));
let token = JSON.parse(localStorage.getItem("token"))

const api = axios.create({
    baseURL:`http://localhost:8080`,
    headers: {
        'Authorization': `Bearer ${token}`
    }
})


let campoNome = document.getElementById("nome")
let campoCnpj = document.getElementById("cnpj")
let botaoCadastrar = document.querySelector("#cadastrarEmp")
botaoCadastrar.addEventListener("click",function(){
    validar_cnpj_e_nome()
})

campoNome.addEventListener("input", ()=>{
    let value = campoNome.value
    if(value.length > 15){
        value = value.slice(0, 15);
    }
    campoNome.value = value;
})

campoCnpj.addEventListener("input", ()=>{
    formatar_campo_cnpj();
})

function formatar_campo_cnpj(){
    let value = campoCnpj.value.replace(/\D/g, '');
    if (value.length > 14) {
        value = value.slice(0, 14);
    }
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
        if (i === 2 || i === 5) {
            formattedValue += '.';
        } else if (i === 8) {
            formattedValue += '/';
        } else if (i === 12) {
            formattedValue += '-';
        }
        formattedValue += value[i];
    }
    campoCnpj.value = formattedValue;
}

function info_usuario(usuario){
    namespace = document.getElementById("user_name").textContent = usuario.nome
    rolespace = document.getElementById("user_role").textContent = "Adminstrador"
}

function firstPrompt(id, nome){
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `

    var firstPrompt = `
    <div class="prompt" id="prompt">
        <div class="l0">
            <i class="fa-solid fa-xmark" id="fechar"></i>
        </div>
        <div class="conteudoPrompt">
            <span class="prompt_text">Inserir novo Nome:</span>
            <input type="text" class="input_data" id="input_data" value=${nome}>
            <div class="btns">
                <button class="btn_p" id="btn_cont" onclick="editPrompt">Salvar</button>
            </div>
        </div>
    </div>
    `

    document.body.insertAdjacentHTML('beforeend', back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML('beforeend', firstPrompt);

    let prompt_name = document.getElementById("input_data");
    let prompt = document.getElementById("prompt");

    document.getElementById("btn_cont").addEventListener("click", ()=>{
        nomeData = prompt_name.value;
        if(nomeData === ""){
            alert("Digite um nome.");
        }else{
            prompt.remove();
            document.getElementById("back_prompt").remove();
            editarEmpresa(id, nomeData);
        }
    })

    document.getElementById("fechar").addEventListener("click", () => {
        document.getElementById("back_prompt").remove();
    });
}

async function excluirEmpresa(id){
    let response = await api.delete(`/empresas/${id}`)
    if(response.status == 204){
        document.getElementById("back_prompt").remove();
        generateTable()
        let message = "Empresa deletada com sucesso.";
        let path = '/Front-end/media/images/success-img.gif'
        prompt_function(message, path)
    }
}

function promptDelete(id){
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `

    var deletePrompt = `
        <div class="promptEx" id="prompt">
            <span class="prompt_text">Deseja realmente excluir?</span>
            <div class="btns">
                <button class="btn_p" id="btn_sim">SIM</button>
                <button class="btn_p" id="btn_nao">NÃO</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML('beforeend', deletePrompt);

    document.getElementById("btn_nao").addEventListener("click", () => {
        document.getElementById("back_prompt").remove();
    });

    document.getElementById("btn_sim").addEventListener("click", () => {
        excluirEmpresa(id)
    });
}

async function generateTable(){
    let response = await api.get("/empresas");
    dados = response.data;

    let table = document.getElementById("body_dados");
    table.innerHTML=''
    for (let x = 0; x < dados.length; x++) {
        let dadosTable = `
        <tr>
        <div class="line">
                    <div class="text">
                    <p>Nome: ${dados[x].nome}</p>
                    <p class="txtCnpj">CNPJ: ${dados[x].cnpj}</p>
                    </div>
                    <div class="buttonsEE">
                    <button class="btns" id="editar" onclick="firstPrompt('${dados[x].id}', '${dados[x].nome}')"><i class="fa-solid fa-pen"style="color: #0c4df0; margin-right: 10px"></i>Editar</button>
                    <button class="btns" id="excluir" onclick="promptDelete('${dados[x].id}')"><i class="fa-solid fa-trash" style="color: #fa0000; margin-right: 10px"></i>Excluir</button> 
                    </div>
        </div>
        </tr>`;
        table.insertAdjacentHTML("afterbegin", dadosTable);
    }
}

async function editarEmpresa(id, new_nome){
    try{
        let data={
            nome:new_nome.toUpperCase(),
            id:id
        }
        let response = await api.put(`/empresas`, data)

        if(response.status == 200){
            generateTable();
            let message = "Alteração feita com sucesso!";
            let path = '/Front-end/media/images/success-img.gif'
            prompt_function(message, path)
        } else {
            let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
            let path = '/Front-end/media/images/error-img.gif'
            prompt_function(message, path)
        }
    }catch(err){
        let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
        let path = '/Front-end/media/images/error-img.gif'
        prompt_function(message, path)
    }
}

function validar_cnpj_e_nome(){
    let new_nome = document.getElementById('nome').value.toUpperCase();
    let new_cnpj = document.getElementById('cnpj').value.replace(/[.\-\/\s]/g, '');

    if(new_cnpj.length < 14 && new_nome.length < 2 ){
        let message = "O campos não podem estar vazios ou incompletos.";
        let path = '/Front-end/media/images/error-img.gif'
        prompt_function(message, path)
    }
    else if (new_cnpj.length < 14) {
        let message = "O campo de CNPJ não pode estar vazio ou incompleto.";
        let path = '/Front-end/media/images/error-img.gif'
        prompt_function(message, path)
    } else if (new_nome.length < 2) {
        let message = "O campo de nome empresa não pode estar vazio ou incompleto.";
        let path = '/Front-end/media/images/error-img.gif'
        prompt_function(message, path)
    } else {
        document.getElementById('nome').value = ''
        document.getElementById('cnpj').value = ''
        cadastrarEmpresa(new_nome, new_cnpj);
    }
}
async function cadastrarEmpresa(new_nome, new_cnpj){
    try{
        let data = {
            cnpj: new_cnpj,
            nome: new_nome
        };
        let response = await api.post(`/empresas`, data)
        if(response.status == 201){
            generateTable();
            let message = "Cadastro feito com sucesso!";
            let path = '/Front-end/media/images/success-img.gif'
            prompt_function(message, path);
        }else{
            let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
            let path = '/Front-end/media/images/error-img.gif'
            prompt_function(message, path)
        }
    }
    catch(err){
        let message = "Alguma coisa deu errado. Tente novamente mais tarde.";
        let path = '/Front-end/media/images/error-img.gif'
        prompt_function(message, path)
    }
}

function prompt_function(message, path) {
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `;

    var prompt_function= `
        <div class="prompt1" id="prompt">
            <img src="${path}" style="width: 35%">
            <span class="prompt_text">${message}</span>
            <div class="btns">
                <button class="btn_p" id="btn_OK">OK</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML("beforeend", prompt_function);

    document.getElementById("btn_OK").addEventListener("click", () => {
        document.getElementById("back_prompt").remove();
        document.getElementById("prompt").remove();
    });
}
