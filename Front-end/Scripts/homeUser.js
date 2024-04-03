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
    "Nexus Solutions Worldwide Enterprises",
    "Pioneering Technologies Ltd. Solutions",
    "Zenith Enterprises International Services",
    "Infinite Innovations Solutions Group",
    "Elite Solutions Group Ltda. Holdings",
    "Apex Corporation Holdings Inc."
];

// Função para preencher a tabela com as empresas
function preencherTabelaEmpresas() {
    var tabelaBody = document.querySelector("#tabelaEmpresas tbody");

    empresas.forEach(function(empresa) {
        var row = tabelaBody.insertRow(); // Inserir uma nova linha na tabela
        var cell = row.insertCell(); // Inserir uma nova célula na linha
        cell.textContent = empresa; // Adicionar o nome da empresa à célula
    });
}

// Chamar a função para preencher a tabela quando a página carregar
window.onload = function() {
    preencherTabelaEmpresas();
};