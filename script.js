const cepInput = document.getElementById("cep");
const logradouro = document.getElementById("logradouro");
const bairro = document.getElementById("bairro");
const localidade = document.getElementById("localidade");
const estado = document.getElementById("estado");
const btnEnviar = document.getElementById("btn-enviar");
const errorCep = document.getElementById("error-cep");

const numeroInput = document.getElementById("numero");
const complementoInput = document.getElementById("complemento");


//Executa assim que a página carrega
window.addEventListener("DOMContentLoaded", () => {
    const dadosSalvos = localStorage.getItem("enderecoUsuario");

    if (dadosSalvos) {
        //Converte os dados salvos de volta para objeto JavaScript
        const endereco = JSON.parse(dadosSalvos);

        //Preenche os campos do formulário com os dados salvos
        cepInput.value = endereco.cep || '';
        logradouro.value = endereco.logradouro || '';
        numeroInput.value = endereco.numero || '';
        complementoInput.value = endereco.complemento || '';
        bairro.value = endereco.bairro || '';
        localidade.value = endereco.localidade || '';
        estado.value = endereco.estado || '';

        if (endereco.numero === "S/N") {
           const chkSemNumero = document.getElementById("sem-numero");
            if (chkSemNumero)  chkSemNumero.checked = true;
                numeroInput.value = "S/N";
                numeroInput.readOnly = true; // Bloqueia o campo para o usuário não mexer
            } else {
                numeroInput.value = endereco.numero;
            }
        
        }
});


// Máscara de digitação para o campo CEP em tempo real
cepInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (value.length > 5) {
        value = value.replace(/^(\d{5})(\d)/, '$1-$2'); // Adiciona o hífen após os 5 primeiros dígitos
    }
    e.target.value = value;
    errorCep.style.display = "none"; // Oculta a mensagem de erro ao digitar
    errorCep.textContent = "";
});


//Busca do CEP com Feedback Visual
cepInput.addEventListener("blur", async () => {
    // Limpa caracteres especiais do CEP, deixando apenas números
    let cepLimpo = cepInput.value.replace(/\D/g, '');
    
    if (cepLimpo.length === 0) return; // Se o campo estiver vazio, não faz nada

    if (cepLimpo.length !== 8) {
        showError("CEP inválido. Por favor, insira um formato de CEP válido.");
        clearFields();
        return;
    }

    // Iniciando estado de carregamento
    setLoadingState(true);

    try {
    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    if (!response.ok) throw new Error();

    const data = await response.json();

    if (data.erro) {
        showError("CEP não encontrado. Por favor, insira um CEP válido.");
        clearFields();
        return;
    }

    //Preenchendo os campos com os dados retornados
    logradouro.value = data.logradouro || '';
    bairro.value = data.bairro || '';
    localidade.value = data.localidade || '';
    estado.value = data.uf || '';
    errorCep.style.display = "none"; // Oculta a mensagem de erro

    // Exeperiência de usuário: Foco no campo número após preencher os dados do CEP
    numeroInput.focus();

    } catch (error) {
        showError("Erro na conexão com o serviço de CEP.");
        clearFields();
    } finally {
        setLoadingState(false);
    }

});

//Funções auxiliares de Interface
function setLoadingState(isLoading) {
        if (isLoading) {
            cepInput.disabled = true;
            btnEnviar.disabled = true;
            btnEnviar.textContent = "Buscando CEP...";
        } else {
            cepInput.disabled = false;
                btnEnviar.disabled = false;
                btnEnviar.textContent = "Buscar CEP";
        }
}

function showError(message) {
    errorCep.textContent = message;
    errorCep.style.display = "block"; // Exibe a mensagem de erro
}

function clearFields() {
    logradouro.value = '';
    bairro.value = '';
    localidade.value = '';
    estado.value = '';
    numeroInput.value = '';
    complementoInput.value = '';
    chkSemNumero.checked = false; // Desmarca a opção "Sem Número"
    numeroInput.readOnly = false; // Garante que o campo número esteja desbloqueado
}

const chkSemNumero = document.getElementById("sem-numero");

chkSemNumero.addEventListener("change", (e) => {
    if (e.target.checked) {
        numeroInput.value = "S/N";      // Preenche com Sem Número
        numeroInput.readOnly = true;    // Bloqueia o campo para o usuário não mexer
        errorCep.style.display = "none"; // Limpa erros se houver
    } else {
        numeroInput.value = "";         // Limpa o campo se desmarcar
        numeroInput.readOnly = false;   // Desbloqueia o campo
        numeroInput.focus();            // Devolve o foco para digitação
    }
});

const formEndereco = document.getElementById("form-endereco");
formEndereco.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita o envio do formulário para fins de teste

    // Validação final antes do envio
    if(!logradouro.value || !localidade.value) {
        showError("Por favor, digite um CEP válido antes de enviar o formulário.");
        return;
    }

    // Monta o objeto de endereço para envio
    const dadosEndereco = {
        cep: cepInput.value,
        logradouro: logradouro.value,
        numero: numeroInput.value.trim() || "S/N", // Se estiver vazio, considera S/N
        complemento: complementoInput.value.trim(),
        bairro: bairro.value,
        localidade: localidade.value,
        estado: estado.value
    };

    // Salva o objeto na memória do navegador convertendo para JSON (simulação de envio)
    localStorage.setItem("enderecoUsuario", JSON.stringify(dadosEndereco));

    //Simulação de envio do formulário (aqui você pode substituir por uma requisição real)
    console.log("Dados salvos no localStorage:", dadosEndereco);

    //Feedback visual para o usuário
    alert("Endereço salvo com sucesso! Confira o console para ver os dados.");

    // Limpa o formulário após o envio
    formEndereco.reset();
    clearFields();
});