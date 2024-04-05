function inserir_valor() {
    let tabela = document.getElementById('tabela').getElementsByTagName('tbody')[0];

}

let rec_valor = [
    {
        nome: "Amanda",
        idade: 2
    },
    {
        nome: "André",
        idade: 1
    },
    {
        nome:"Bia",
        idade: 3
    }
]

for(let x = 0; x < rec_valor.length; x++) {
    let linha = tabela.insertRow();
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    
    let celulaCheck = linha.insertCell(0); 
    let celulaNome = linha.insertCell(1);
    let celulaIdade = linha.insertCell(2);
    celulaCheck.appendChild(checkbox); 
    celulaNome.innerHTML = rec_valor[x].nome;
    celulaIdade.innerHTML = rec_valor[x].idade;

    celulaCheck.classList.add("tab_check");
}

inserir_valor();
