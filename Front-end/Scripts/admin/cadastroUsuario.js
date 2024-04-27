window.onload = () => {
    getAllUsuarios() 
}

let botaoCadastrar = document.querySelector("#cadastrarUser")
let botaoOk = document.querySelector("#ok")


botaoCadastrar.addEventListener("click", function(){
    montarUsuario();
});


async function getAllUsuarios(){
    let response = await axios.get("http://localhost:8080/usuarios");
    dados = response.data;
    console.log(response);
    gerarTabela(dados)
}

function gerarTabela(dados){
    
    let table = document.getElementById("body_dados");
    for (let x = 0; x < dados.length; x++) {
        let dadosTable = `
        <div class="line">
            <div class= "firstPart">
                <p>Nome: ${dados[x].nome}</p>
                <p>Empresa: ${dados[x].empresa}</p>
            </div>
            <div class= "secondPart">
                <p>Email: ${dados[x].email}</p>
                <p>Permissão: ${dados[x].role}</p>
            </div>
            <div class="buttonUser">
                    <button class="buttonEdit" id="editar" onclick="firstPrompt('${dados[x].id}')"><i class="fa-solid fa-pen"style="color: #0c4df0; margin-right: 10px"></i>Editar</button>
                    <button class="buttonRemove" id="excluir" onclick="promptDelete('${dados[x].id}')"><i class="fa-solid fa-trash" style="color: #fa0000; margin-right: 10px"></i>Excluir</button> 
                    </div>
        </div>`
        table.insertAdjacentHTML("afterbegin", dadosTable);
    }
}


async function montarUsuario(){
    let newNome = document.getElementById("nome").value;
    let newemail = document.getElementById("email").value;
    let newsenha = document.getElementById("senha").value;
    let newempresa = document.getElementById("empresa").value;
    let newrole = document.getElementById("role").value;
    let dataJson = {
        nome: newNome,
        email: newemail,
        senha: newsenha,
        //empresa: newempresa,
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
        promptCadastrado();        
    } 
}

function promptCadastrado(){
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
        window.location.href = "cadastroUsuario.html"
    });
}
function promptDelete(id){
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `

    var deletePrompt = `
        <div class="prompt" id="prompt">
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

function firstPrompt(id){
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `

    var firstPrompt = `
    <div class="prompt" id="prompt">
        <span class="prompt_text">Nome:</span>
        <input type="text" class="input_data" id="input_nome" placeholder="Digite aqui...">
        <span class="prompt_text">Email:</span>
        <input type="text" class="input_data" id="input_email" placeholder="Digite aqui...">
        <div class="btns">
            <button class="btn_p" id="btn_cont">Próximo</button>
        </div>
    </div>
    `
    let prompt_name = document.getElementById("input_nome");
    let prompt_email =document.getElementById("input_email");
    console.log(id)
    
    document.body.insertAdjacentHTML('beforeend', back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML('beforeend', firstPrompt);
    

    document.getElementById("btn_cont").addEventListener("click", ()=>{

        if(prompt_email === "" || prompt_name === ""){
            alert("Digite um nome ou email.");
        }else{
            editarUsuario(id,nome,email);
            window.location.href = "cadastroUsuario.html"

        }
    })
}

async function editarUsuario(id, nome, email){
    try{
        let data={
            nome:nome,
            email: email,
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


