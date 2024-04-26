window.onload = () => {
    generateTable()
};

async function generateTable(){
    let response = await axios.get("http://localhost:8080/empresas");
    dados = response.data;
    console.log(response);

    let table = document.getElementById("body_dados");
    for (let x = 0; x < dados.length; x++) {
        let dadosTable = `
        <tr>
        <div class="line">
                    <div class="base-name">Nome: ${dados[x].nome}</div>
                    <div class="base-name">CNPJ: ${dados[x].cnpj}</div>
                    <button id="editar" onclick="editarEmpresa('${dados[x].cnpj}','${dados[x].nome}')">Editar</button>
                    <button id="excluir" onclick="excluirEmpresa('${dados[x].cnpj}')">Excluir</button>
        </div>
        </tr>`;
        table.insertAdjacentHTML("afterbegin", dadosTable);
    }

function excluirEmpresa(cnpj){
    let response = axios.delete(`http://localhost:8080/empresas/${cnpj}`)
    console.log(response)
}

function editarEmpresa(cnpj, new_nome){
    
    let data={nome:new_nome}
    let response = axios.put(`http://localhost:8080/empresas/${cnpj}`, data)
    console.log(response)
}

let new_nome = document.getElementById('nome')
let new_cnpj = document.getElementById('cnpj')
let botaoCadastrar = document.querySelector("#cadastrarEmp")
botaoCadastrar.addEventListener("click",function(){
    cadastrarEmpresa(new_nome, new_cnpj);
})

async function cadastrarEmpresa(new_nome, new_cnpj){
    let data = {
        nome: new_nome,
        cnpj: new_cnpj
    };
    let response = await axios.post(`http://localhost:8080/empresas`, data)
    console.log(data)
}

}

