async function buscarCidade(event) {
    // Previne a atualização automática da página ao enviar o formulário (WCAG 2.1.1)
    event.preventDefault();

    const inputCep = document.querySelector("#cep");
    const cep = inputCep.value.replace(/\D/g, ""); // Higieniza entrada mantendo só números

    const campoCidade = document.querySelector("#resultadoCidade");
    const campoBairro = document.querySelector("#resultadoBairro");

    // Validação com feedback descritivo de erro (WCAG 3.3.1)
    if (cep.length !== 8) {
        campoCidade.textContent = "Erro: O CEP deve ter exatamente 8 números.";
        campoBairro.textContent = "";
        return;
    }

    // Status lido em tempo real por leitores de tela via aria-live (WCAG 4.1.3)
    campoCidade.textContent = "Carregando dados do CEP...";
    campoBairro.textContent = "";

    try {
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        const resposta = await fetch(url);
        const dados = await resposta.json();

        if (dados.erro) {
            campoCidade.textContent = "Aviso: CEP não encontrado.";
            campoBairro.textContent = "";
        } else {
            campoCidade.textContent = `Cidade: ${dados.localidade} - ${dados.uf}`;
            campoBairro.textContent = `Bairro: ${dados.bairro || "Não informado"}`;
        }
    } catch (erro) {
        campoCidade.textContent = "Erro de conexão: Não foi possível buscar o CEP.";
        campoBairro.textContent = "";
    }
}