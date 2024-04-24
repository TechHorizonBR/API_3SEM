let cabecalho = false;
let arquivoSelec;
let nomeData = "";
let reqSuccess = {
    mdReq: false,
    csvReq:false,
}

async function sendMetadata(){
    try{
        const newMetadata = {
            nome: nomeData,
            usuario:{
                id:1
            }
        }

        const res = await axios.post("http://localhost:8080/metadata",newMetadata,{
            headers:{
                'Content-Type': 'application/json'
            }
        });

        // console.log(res);
        // console.log(res.data);
        console.log("DATA EM UPLOAD:",res.data);
        localStorage.setItem("metadata_id", res.data.id);
        if(res.status === 200){
            reqSuccess.mdReq = true;
        }else{
            alert("Um erro ocorreu no sistema, tente novamente mais tarde.")
        }
        sendCSV(arquivoSelec);
    }catch(err){
        console.error(err);
    }
}

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
        localStorage.setItem('cabecalho', res.data[0]);
        for(let x = 1; x < res.data.length; x++){
            localStorage.setItem(`dados${x}`, res.data[x]);
        }

        // console.log(res);
        if(res.status === 200){
            reqSuccess.csvReq = true;
        }else{
            alert("Um erro ocorreu no sistema, tente novamente mais tarde.")
        }

        if(reqSuccess.csvReq && reqSuccess.mdReq){
            window.location.href = "lz_personalizacao.html";
        }
    }catch(err){
        console.error(err);
    }
}

let arquivo = document.getElementById("arquivo");
arquivo.addEventListener("change", () => {
    arquivoSelec = arquivo.files[0];
    arquivo.value = "";
    firstPrompt();
});

function firstPrompt(){
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `

    var firstPrompt = `
    <div class="prompt" id="prompt">
        <span class="prompt_text">Nome do esquema:</span>
        <input type="text" class="input_data" id="input_data" placeholder="Digite aqui...">
        <span class="prompt_text">Nome da empresa:</span>
        <input type="text" class="input_data" id="input_companyname" placeholder="Digite aqui...">
        <div class="btns">
            <button class="btn_p" id="btn_cont">Próximo</button>
        </div>
    </div>
    `

    document.body.insertAdjacentHTML('beforeend', back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML('beforeend', firstPrompt);

    let prompt_name = document.getElementById("input_data");
    let prompt = document.getElementById("prompt");

    document.getElementById("btn_cont").addEventListener("click", ()=>{
        nomeData = prompt_name.value;
        if(nomeData === ""){
            alert("Digite um nome.");
        }else{
            prompt.remove();
            document.getElementById("back_prompt").remove();
            validation(nomeData);
        }
    })
}

function validation(nomeData) {
    const regex = /^[a-zA-Z0-9_]*$/;

    if (regex.test(nomeData)) {
        secondPrompt()
        console.log("DEU BOM")
    }else{
        newFailedPrompt()
    }
}

function secondPrompt(){
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `

    var secondPrompt = `
    <div class="prompt" id="prompt">
        <span class="prompt_text">O CSV contém cabeçalho?</span>
        <div class="btns">
            <button class="btn_p" id="btn_yes">Sim</button>
            <button class="btn_p" id="btn_no">Não</button>
        </div>
    </div>
    `

    document.body.insertAdjacentHTML('beforeend', back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML('beforeend', secondPrompt);
    let prompt = document.getElementById("prompt");

    document.getElementById("btn_yes").addEventListener("click", ()=>{
        cabecalho = true;
        prompt.remove();
        var_back.remove();
        sendMetadata();
    })

    document.getElementById("btn_no").addEventListener("click", ()=>{
        cabecalho = false;
        prompt.remove();
        var_back.remove();
        sendMetadata();
    })
}

function newFailedPrompt(){
    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `

    var failedPrompt = `
        <div class="prompt" id="prompt">
            <span class="prompt_text" id="validate_identification">Nome inserido é inválido!</span>
            <div id="text_validation">Os valores dos campos não podem conter espaços ou caracteres especiais, exceto o caractere de sublinhado (_).</div>
            <div class="btns">
                <button class="btn_p" id="btn_ok">OK</button>
            </div>
        </div>
    `

    document.body.insertAdjacentHTML('beforeend', back);
    let var_back = document.getElementById("back_prompt");
    var_back.insertAdjacentHTML('beforeend', failedPrompt);

    document.getElementById("btn_ok").addEventListener("click", () => {
        document.getElementById("prompt").remove();
        document.getElementById("back_prompt").remove();
    });
}
