window.onload = () => {
    getAllUsuarios() 
    buscarEmpresas()
    info_usuario(usuario)
}

var jsonusuario = localStorage.getItem("usuario");
var usuario = JSON.parse(jsonusuario);
let empresas_bubble = document.getElementById("options-selected");
let perm_bubble = document.getElementById("options_perm");
let roles = [];
let all_empresas = [];
let selecao = document.getElementById("role");
let empresa_selec = document.getElementById("empresa");
let botaoCadastrar = document.querySelector("#cadastrarUser")
let botaoOk = document.querySelector("#ok")
let opcoesempresas = document.getElementById("empresa")
botaoCadastrar.addEventListener("click", function(){
    montarUsuario(roles);
});

function info_usuario(usuario){
    namespace = document.getElementById("user_name").textContent = usuario.nome
    rolespace = document.getElementById("user_role").textContent = "Adminstrador"
    console.log(usuario)
}

// let btn_close = document.getElementById(`btn_${newrole}`);
// btn_close.addEventListener("click", () => {
//     console.log("FECHOU");
//     let divToRemove = btn_close.parentElement;
//     let roleIndex = rolesIndexes[buttonId];
//     roles.splice(roleIndex, 1);
//     divToRemove.remove();
//     delete rolesIndexes[buttonId];
//     console.log(roles);
// });

empresa_selec.addEventListener("change", ()=>{
    let newempresa = empresa_selec.value;
    console.log(newempresa);
    if(newempresa !== ""){
        if (!(all_empresas.includes(newempresa))) {
            all_empresas.push(newempresa);
            let buttonId = `btn_${newempresa}`;
            let bubble = `
                <div class="opt_empresa">${newempresa}<button id="${buttonId}" class="opt_btn">X</button></div>
            `;
            empresas_bubble.insertAdjacentHTML("beforeend", bubble);
            console.log(all_empresas);
            let botao = document.getElementById(buttonId);
            botao.addEventListener("click", ()=>{
                all_empresas = all_empresas.filter(item=>item!==newempresa);
                console.log(all_empresas);
                let divpai = botao.parentNode;
                divpai.parentNode.removeChild(divpai);
            })
        }
    }
})

selecao.addEventListener("change", () => {
    let newrole = selecao.value;
    if(newrole !== ""){
        if (newrole === "ROLE_ADMIN") {
            roles = [];
            perm_bubble.innerHTML = "";
            selecao.disabled = true;
        }
        console.log(newrole);
        if (!(roles.includes(newrole))) {
            roles.push(newrole);
            let buttonId = `btn_${newrole}`;
            let bubble = `
                <div class="opt_empresa">${newrole}<button id="${buttonId}" class="opt_btn">X</button></div>
            `;
            perm_bubble.insertAdjacentHTML("beforeend", bubble);
            console.log(roles);
    
            let botao = document.getElementById(buttonId);
            botao.addEventListener("click", ()=>{
                roles = roles.filter(item => item !== newrole);
                selecao.disabled = false;
                console.log(roles);
                let divpai = botao.parentNode;
                divpai.parentNode.removeChild(divpai);
            })
        }
    }
});


function limparCampo() {
    document.getElementById("nome").value = ""
    document.getElementById("email").value = ""
    document.getElementById("senha").value = ""
    document.getElementById("empresa").value = ""
    document.getElementById("role").value = ""
}

async function getAllUsuarios(){
    let response = await axios.get("http://localhost:8080/usuarios");
    dados = response.data;
    console.log(response);
    gerarTabela(dados)
}

function limparTabela() {
    let table = document.getElementById("body_dados");
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
}


function gerarTabela(dados){
    
    limparTabela()
    let table = document.getElementById("body_dados");
    for (let x = 0; x < dados.length; x++) {
        let dadosTable = `
        <div class="line">
            <div class= "firstPart">
                <p>Nome: ${dados[x].nome}</p>
            </div>
            <div class= "secondPart">
                <p>Email: ${dados[x].email}</p>
            </div>
            <div class="buttonUser">
                    <button class="buttonEdit" id="editar" onclick="firstPrompt('${dados[x].id}', '${dados[x].nome}', '${dados[x].email}', '${dados[x].senha}')"><i class="fa-solid fa-eye"style="color: #0c4df0; margin-right: 10px"></i>Visualizar</button>
                    <button class="buttonRemove" id="excluir" onclick="promptDelete('${dados[x].id}')"><i class="fa-solid fa-trash" style="color: #fa0000; margin-right: 10px"></i>Excluir</button> 
                    </div>
        </div>`
        table.insertAdjacentHTML("afterbegin", dadosTable);
    }
}

async function buscarEmpresas(){
    let response = await axios.get("http://localhost:8080/empresas");
    console.log(response)
    let empresas_json = response.data

    if(response.status == 200){
        listarEmpresas(empresas_json)
    }
}

function listarEmpresas(empresas_json){
    empresas_json.forEach(empresa_json => {
        let option_empresa = document.createElement("option");
        option_empresa.value = empresa_json.nome;
        option_empresa.textContent = empresa_json.nome;
        opcoesempresas.appendChild(option_empresa)
    });

}

async function montarUsuario(roles){
    let newNome = document.getElementById("nome").value;
    let newemail = document.getElementById("email").value;
    let newsenha = document.getElementById("senha").value;
    let newempresa = document.getElementById("empresa").value;
    let newrole = document.getElementById("role").value;

    if (newsenha.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return;
    }

    let dataJson = {
        nome: newNome.toUpperCase(),
        email: newemail,
        senha: newsenha,
        empresa: newempresa,
        roleUsuario: [newrole],
    };
    console.log(dataJson)
    cadastrarUsuario(dataJson);
}
async function cadastrarUsuario(dataJson){
    try{

    }catch(err){
        console.error(err)
    }
    let response = await axios.post("http://localhost:8080/usuarios",dataJson);
    console.log(response);
    if (response.status === 201){
        promptCadastradosucess();        
    } 
}

function promptCadastradosucess(){
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `

    var successPrompt = `
        <div class="prompt" id="prompt">
            <span class="prompt_text">Usuário cadastrado com Sucesso!</span>
            <div class="btns">
                <button class="btn_p" id="btn_ok">OK</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML('beforeend', successPrompt);

    document.getElementById("btn_ok").addEventListener("click", () => {
        getAllUsuarios()
        limparCampo()
        document.getElementById("prompt").remove()
        document.getElementById("back_prompt").remove()  

    });
}
function promptDeletadosucess(){
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `

    var successPrompt = `
        <div class="prompt" id="prompt">
            <span class="prompt_text">Usuário deletado com Sucesso!</span>
            <div class="btns">
                <button class="btn_p" id="btn_ok">OK</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML('beforeend', successPrompt);

    document.getElementById("btn_ok").addEventListener("click", () => {
        getAllUsuarios()
        document.getElementById("prompt").remove()
        document.getElementById("back_prompt").remove()  

        // window.location.href = "cadastroUsuario.html"

    });
}

function selecionar(id){
    console.log(id);
}

function promptDelete(id){
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `

    var deletePrompt = `
        <div class="prompt1" id="prompt">
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
        document.getElementById("prompt").remove();
    });

    document.getElementById("btn_sim").addEventListener("click", () => {
        excluirEmpresa(id)
        document.getElementById("back_prompt").remove();
        document.getElementById("prompt").remove();
        
    });
}

function firstPrompt(id, nome, email, senha){
    
        var back = `
        <div class="back_prompt" id="back_prompt">
        </div>
        `

        var firstPrompt = `
        <div class="prompt" id="prompt">
        <div class="conteudoEditar">
        <div class="l1">
            <p>Nome:</p>
            <input type="text" name="nome" id="nome" value=${nome} class="fields">
            <p>Email:</p>
            <input type="text" name="email" id="email" value=${email} class="fields">
        </div>
        <div class="l2">
            <p>Senha:</p>
            <input type="password" name="senha" id="senha" value=${senha} class="fields">
            <br>
            <p>Empresa:</p>
            <select name="empresa" id="empresa" class="fields">
                <option value="">Selecione...</option>
            </select>
            <p>Permissões:</p>
            <select name="permissao" id="role" class="fields">
                <option value="">Selecione...</option>
                <option value="ROLE_ADMIN">Administrador</option>
                <option value="ROLE_LZ">Landing Zone</option>
                <option value="ROLE_BRONZE">Bronze</option>
                <option value="ROLE_SILVER">Silver</option>
            </select>
        </div>
        <div class="l3">
            <i class="fa-solid fa-floppy-disk id="plusCad" style="color: #0c4df0;"></i>
            <button class="salvar" id="btn_salvar">SALVAR</button>
        </div>
    </div>
        </div>
        `
        let prompt_name = document.getElementById("input_nome");
        let prompt_email = document.getElementById("input_email");
        let prompt_empresa = document.getElementById("input_empresa");
        let prompt_permisao = document.getElementById("input_permissao");
        console.log(id)
        
        document.body.insertAdjacentHTML('beforeend', back);
        let var_back = document.getElementById("back_prompt");
        var_back.insertAdjacentHTML('beforeend', firstPrompt);
        
    
        // document.getElementById("btn_cont").addEventListener("click", ()=>{
    
        //     if(prompt_email === "" || prompt_name === "" || prompt_empresa === "" || prompt_permissao === ""){
        //         alert("Digite um nome ou email.");
        //     }else{
        //         editarUsuario(id,nome,email,empresa,permissao);
        //         window.location.href = "cadastroUsuario.html"
    
        //     }
        // })

}

async function editarUsuario(id, nome, email, empresa, permissao){
    try{
        let data={
            nome:nome,
            email: email,
            empresa: empresa,
            permissão: permissao,
            roleUsuario: ["ROLE_LZ"],
            id:id
        }
        let response = await axios.put(`http://localhost:8080/usuarios/${id}`, data)
        console.log(data)
        if(response.status == 200){
            generateTable();
            alert("Alteração realizada!")
        } else {
            alert("ERROR! Atualização não executada.")
        }
    }catch(err){
        console.error("ERRO:", err)
        alert("Erro no sistema.")
    }

}

async function excluirEmpresa(id){
    let response = await axios.delete(`http://localhost:8080/usuarios/${id}`);
    console.log(response);
    promptDeletadosucess()

}

async function buscaPorId(id){
    let resposta = await axios.get(`http://localhost:8080/usuarios/${id}`);
}



