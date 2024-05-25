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
    console.log(usuario)
}

function firstPrompt(id, nome){
    console.log(nome)
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
    console.log(response)
    if(response.status == 204){
        document.getElementById("back_prompt").remove();
        generateTable()
        promptDeleteEmp()
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

function promptDeleteEmp(){
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `

    var promptDeleteEmp = `
        <div class="promptEx" id="prompt">
            <span class="prompt_text">Empresa excluida com sucesso.</span>
            <div class="btns">
                <button class="btn_p" id="btn_OK" onclick="promptDeleteEmp">OK</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML('beforeend', promptDeleteEmp);

    document.getElementById("btn_OK").addEventListener("click", () => {
        document.getElementById("back_prompt").remove();
    });
}

async function generateTable(){
    let response = await api.get("/empresas");
    dados = response.data;
    console.log(response);

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
        console.log(`Id: ${id} NOVO NOME: ${new_nome}`);
        let data={
            nome:new_nome.toUpperCase(),
            id:id
        }
        let response = await api.put(`/empresas`, data)
        console.log(response)
        if(response.status == 200){
            generateTable();
            editPrompt();
        } else {
            alert("ERROR! Atuaçização não executada.")
        }
    }catch(err){
        console.error("ERRO:", err)
        alert("Erro no sistema.")
    }
}

function editPrompt() {
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `;

    var editPrompt = `
        <div class="prompt1" id="prompt">
            <span class="prompt_text">Alteração feita com sucesso!</span>
            <div class="btns">
                <button class="btn_p" id="btn_OK">OK</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML("beforeend", editPrompt);

    document.getElementById("btn_OK").addEventListener("click", () => {
        document.getElementById("back_prompt").remove();
        document.getElementById("prompt").remove();
    });
}

function validar_cnpj_e_nome(){
    let new_nome = document.getElementById('nome').value.toUpperCase();
    let new_cnpj = document.getElementById('cnpj').value.replace(/[.\-\/\s]/g, '');
    switch (new_cnpj,new_nome){

        case new_cnpj.length < 14:
            alert("Digite CNPJ corretamente.")
            break;

        case new_nome.length < 2:
            alert("Digite um NOME válido.")
            break;

        default:
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
            promptSuccess();
        }else{
            alert("Erro no cadastro.")
        }
        console.log(response)
    }catch(err){
        console.error(err)
        alert("Erro no cadastro.")
    }
}

function promptSuccess() {
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `;

    var promptSuccess= `
        <div class="prompt1" id="prompt">
            <span class="prompt_text">Cadastro feito com sucesso!</span>
            <div class="btns">
                <button class="btn_p" id="btn_OK">OK</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML("beforeend", promptSuccess);

    document.getElementById("btn_OK").addEventListener("click", () => {
        document.getElementById("back_prompt").remove();
        document.getElementById("prompt").remove();
    });
}
