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
                id:1,
                nome:"Andre",
                email:"andre@email.com",
                senha:"123"
            }
        }

        const res = await axios.post("http://localhost:8080/metadata",newMetadata,{
            headers:{
                'Content-Type': 'application/json'
            }
        });

        console.log(res);
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

        console.log(res);
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
    newPrompt();
});


function newPrompt(){

    var back = `
    <div class="back_prompt" id="back_prompt">
    </div>
    `
    var pmp1 = `
        <div class="prompt" id="prompt">
            <span class="prompt_text">O CSV contém cabeçalho?</span>
            <div class="btns">
                <button class="btn_p" id="btn_yes">Sim</button>
                <button class="btn_p" id="btn_no">Não</button>
            </div>
        </div>
    `;

    var pmp2 = `
        <div class="prompt" id="prompt">
            <span class="prompt_text">Digite o nome para o esquema:</span>
            <input type="text" class="input_data" id="input_data" placeholder="Digite aqui...">
            <div class="btns">
                <button class="btn_p" id="btn_cont">Próximo</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', back);

    let var_back = document.getElementById("back_prompt");

    var_back.insertAdjacentHTML('beforeend', pmp2);

    let prompt = document.getElementById("prompt");

    let prompt_name = document.getElementById("input_data");
    document.getElementById("btn_cont").addEventListener("click", ()=>{
        nomeData = prompt_name.value;
        if(nomeData === ""){
            alert("Digite um nome.");
        }else{
            console.log("DIGITADO:", nomeData)
            prompt.remove();

            // Adicionando o HTML ao corpo do documento
            var_back.insertAdjacentHTML('beforeend', pmp1);
            prompt = document.getElementById("prompt");

            let prompt_csv = document.getElementById("back_prompt");
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
    })
}

