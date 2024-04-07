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
      
        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                const metadata = data[key];
    
                const boxElement = document.createElement("div");
                boxElement.classList.add("box");
    
                const nameElement = document.createElement("h1");
                nameElement.textContent = metadata.nome;
                nameElement.classList.add("name-metadata");
    
                boxElement.appendChild(nameElement);
                metadataContainer.appendChild(boxElement);
            }
        }
    });
}

window.onload = function() {
    getAllMetadatasporUsuario("http://localhost:8080/metadata/usuario");
};
