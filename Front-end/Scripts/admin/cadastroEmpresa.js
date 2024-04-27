window.onload = () => {
    generateTable()
};

async function generateTable(){
    let response = await axios.get("http://localhost:8080/empresas");
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
                    <button class="btns" id="editar" onclick="editarEmpresa('${dados[x].cnpj}','${dados[x].nome}')"><i class="fa-solid fa-pen"style="color: #0c4df0; margin-right: 10px"></i>Editar</button>
                    <button class="btns" id="excluir" onclick="excluirEmpresa('${dados[x].cnpj}')"><i class="fa-solid fa-trash" style="color: #fa0000; margin-right: 10px"></i>Excluir</button> 
                    </div>
        </div>
        </tr>`;
        table.insertAdjacentHTML("afterbegin", dadosTable);
    }

let campoCnpj = document.getElementById("cnpj")
campoCnpj.addEventListener("input", ()=>{
    let value = campoCnpj.value.replace(/\D/g, ''); // Remove caracteres não numéricos
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
})

function excluirEmpresa(cnpj){
    let response = axios.delete(`http://localhost:8080/empresas/${cnpj}`)
    console.log(response)
}

function editarEmpresa(cnpj, new_nome){
    
    let data={nome:new_nome}
    let response = axios.put(`http://localhost:8080/empresas/${cnpj}`, data)
    console.log(response)
}


let botaoCadastrar = document.querySelector("#cadastrarEmp")
botaoCadastrar.addEventListener("click",function(){
    let corretos = 1;
    let corretos2 = 1;
    let new_nome = document.getElementById('nome').value;
    let new_cnpj = document.getElementById('cnpj').value;
    new_nome = new_nome.toUpperCase();
    new_cnpj = new_cnpj.replace(/[.\-\/\s]/g, '');
    if (new_cnpj.length < 14){
        alert("Digite CNPJ corretamente.")
        corretos = 0;
    } else {
        corretos = 1;
    }
    if (new_nome.length < 2){
        alert("Digite um NOME válido.")
        corretos2 = 0;
    } else {
        corretos2 = 1;
    }
    if (corretos === 1 && corretos2 === 1){
        cadastrarEmpresa(new_nome, new_cnpj);
    }
})

async function cadastrarEmpresa(new_nome, new_cnpj){
    try{
        let data = {
            cnpj: new_cnpj,
            nome: new_nome
        };
        let response = await axios.post(`http://localhost:8080/empresas`, data)
        if(response.status == 201){
            alert("Cadastrado com sucesso!")
            generateTable()
        }else{
            alert("Erro no cadastro.")
        }
        console.log(response)
    }catch(err){
        console.error(err)
        alert("Erro no cadastro.")
    }
}

}

