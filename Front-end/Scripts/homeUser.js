var empresas = [
    "Empresa Alpha Solutions Group",
    "BetaTech Solutions International Services",
    "Gamma Global Enterprises Inc.",
    "Inovação Digital Ltda. & Cia. Solutions",
    "Consultoria Delta Services Corporation",
    "Sistemas Ômega Tech Solutions",
    "Corporação Sigma Solutions Group",
    "NexGen Corporation Ltd. Holdings",
    "InnovateX Solutions Group Worldwide",
    "Visionary Ventures Inc. Innovations",
    "FuturaTech Enterprises LLC Technologies",
    "Proxima Systems Inc. & Co. Innovations",
    "Quantum Dynamics Technologies Solutions",
    "AvantGarde Innovations Group Holdings",
    "Nexus Solutions Worldwide Enterprises"
];

// Função para preencher a tabela com as empresas
function preencherTabelaEmpresas() {
    var tabelaBody = document.querySelector("#tabelaEmpresas tbody");

    empresas.forEach(function(empresa) {
        var btn = document.createElement("button");
        btn.textContent = "Acessar";
        var row = tabelaBody.insertRow();
        var cell1 = row.insertCell();
        cell1.textContent = empresa;
        cell1.id = "cl_emp";
        var cell2 = row.insertCell();
        cell2.id = "cl_btn";
        cell2.appendChild(btn);
    });
}

function getAllMetadatasporUsuario(url){
    fetch(url,{
        method:"get",
        mode: "cors",
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(response => {return response.json()})
    .then(data => {
        console.log(data)
    })
}

window.onload = function() {
    preencherTabelaEmpresas();
    getAllMetadatasporUsuario("http://localhost:8080/metadata")
};



document.getElementById("botaoUpload").addEventListener("click", ()=>{
    window.location.href = "lz_upload.html";
})