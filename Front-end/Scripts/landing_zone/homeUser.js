let user = {
    id: 1, 
    nome: 'Jhony',
    email: 'jhony@email.com',
    senha: '123'
}

function getAllMetadatasporUsuario(url) {
    fetch(url,{
        method:"post",
        mode: "cors",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {return response.json()})
    .then(data => {
        console.log(data)
        const metadataContainer = document.getElementById("metadataContainer");
        if (data.length === 0){
            console.log("Vazia")
            const vazio = document.createElement("h1");
            vazio.innerHTML = "Não há metadatas cadastrados. </br> Realize um upload para cadastrar."
            metadataContainer.appendChild(vazio);
        }else{
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const metadata = data[key];
        
                    const boxElement = document.createElement("div");
            
                    boxElement.classList.add("box");
        
                    const nameElement = document.createElement("h1");
                    nameElement.textContent = metadata.nome;
                    nameElement.classList.add("name-metadata");
                    const idElement = document.createElement("p")
                    idElement.textContent = metadata.id
                    idElement.classList.add("id-metadata")
                    idElement.style.display = "none"
                    boxElement.appendChild(idElement);
        
                    boxElement.appendChild(nameElement);
                    metadataContainer.appendChild(boxElement);
                }
            }
        }
    });
}
document.addEventListener("click", function(event) {

    if (event.target.classList.contains("box")) {
        const metadata = {
            name: event.target.querySelector(".name-metadata").textContent,
            id: event.target.querySelector(".id-metadata").textContent
        };
        localStorage.setItem("metadata", JSON.stringify(metadata));
        window.location.href = "lz_resultado.html";
    }
});

function updateNameUsuario(){
    document.getElementById("username").innerHTML = user.nome
}
window.onload = function() {
    getAllMetadatasporUsuario("http://localhost:8080/metadata/usuario");
    updateNameUsuario()
};
