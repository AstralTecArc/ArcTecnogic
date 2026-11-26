/* Obtém o carrinho do localStorage */
function getCarrinho() {
    const salvo = localStorage.getItem("arcCarrinho");
    return salvo ? JSON.parse(salvo) : [] //Converte se existir, caso contrario, lista vazia
}

/* Salva o carrinho no localStorage */
function saveCarrinho(carrinho) {
    localStorage.setItem("arcCarrinho", JSON.stringify(carrinho));
}

/* Adiciona item ao carrinho */
function adicionarAoCarrinho(id) {
    const carrinho = getCarrinho();

    const item = carrinho.find(function (i) {  //Procura o item com id existente 
        return i.id === id;
    });

    if (item) {
        item.quantidade += 1;   //Aumenta a quantidade
    } else {
        carrinho.push({ id: id, quantidade: 1 }) //Novo entra com 1
    }
    saveCarrinho(carrinho);
}

/* Formata o preço para o formato brasileiro */
function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/* Soma ou Subtrai quantidade */
function alterarQuantidade(id, mudanca) {
    let carrinho = getCarrinho();

    const item = carrinho.find(function (i) {
        return i.id === id;
    });

    if (!item) return; {
        item.quantidade += mudanca;

    if (item.quantidade <= 0) {
            carrinho = carrinho.filter(function (i) {
                return i.id !== id;
            });
        }

        saveCarrinho(carrinho);
    }

    /* Remove item de vez */
    function removerDoCarrinho(id) {
        const carrinho = getCarrinho().filter(function (i) {
            return i.id !== id;
        });
        saveCarrinho(carrinho);
    }
}
