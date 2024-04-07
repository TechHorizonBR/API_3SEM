async function teste() {
    try {
        let response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        console.log(response.status);
        popularTabela(response.data);

    } catch (error) {
        console.log(error);
    }
}

teste();

function popularTabela(dados_Json) {
    let tabela = document.getElementById('tabela').getElementsByTagName('tbody')[0];
    let titulo = document.getElementById("title");
    titulo.innerHTML = "Visualização do metadata " + dados.titulo;

    for (let x = 0; x < dados_Json.length; x++) {
        let linha = tabela.insertRow();
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        let celulaCheck = linha.insertCell(0);
        let celulaId = linha.insertCell(1);
        let celulaRequisicao = linha.insertCell(2);
        let celulaBody = linha.insertCell(3);
        celulaCheck.appendChild(checkbox);
        celulaId.innerHTML = dados_Json[x].id;
        celulaRequisicao.innerHTML = dados_Json[x].title;
        celulaBody.innerHTML = dados_Json[x].body;

        celulaCheck.classList.add("tab_check");


    }

}

