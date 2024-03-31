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

        console.log(res.data);
    }catch(err){
        console.error(err);
    }
}

let arquivo = document.getElementById("arquivo");
arquivo.addEventListener("change", () => {
    console.log("CHEGASTES");
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
    let button_yes = document.getElementById("btn_yes").addEventListener("click", ()=>{
        cabecalho = true;
        prompt_csv.remove();
        sendCSV(arquivoSelec);
    })

    let button_no = document.getElementById("btn_no").addEventListener("click", ()=>{
        prompt_csv.remove();
        sendCSV(arquivoSelec);
    })
}

