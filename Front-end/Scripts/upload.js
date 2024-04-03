let cabecalho = false;
let arquivoSelec;

async function sendCSV(file){
    try{
        const formData = new FormData();
        formData.append('file',file);
        formData.append('header', cabecalho);
        const res = await axios.post("http://localhost:8080/api/upload",formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });

        //Adicionar no LocalStorage
        console.log(res.data);
        localStorage.setItem('cabecalho', res.data[0]);
        for(let x = 1; x < res.data.length; x++){
            localStorage.setItem(`dados${x}`, res.data[x]);
        }
        window.location.href = "lz_personalizacao.html";
    }catch(err){
        console.error(err);
    }
}

let arquivo = document.getElementById("arquivo");
arquivo.addEventListener("change", () => {
    arquivoSelec = arquivo.files[0];
    arquivo.value = "";
    newPrompt();
});


function newPrompt(){
    var pmp = `
    <div class="back_prompt" id="back_prompt">
        <div class="prompt">
            <span class="prompt_text">O CSV contém cabeçalho?</span>
            <div class="btns">
                <button class="btn_p" id="btn_yes">Sim</button>
                <button class="btn_p" id="btn_no">Não</button>
            </div>
        </div>
    </div>
`;

    // Adicionando o HTML ao corpo do documento
    document.body.insertAdjacentHTML('beforeend', pmp);

    let prompt_csv = document.getElementById("back_prompt");
    document.getElementById("btn_yes").addEventListener("click", ()=>{
        cabecalho = true;
        prompt_csv.remove();
        sendCSV(arquivoSelec);
    })

    document.getElementById("btn_no").addEventListener("click", ()=>{
        cabecalho = false;
        prompt_csv.remove();
        sendCSV(arquivoSelec);
    })
}

