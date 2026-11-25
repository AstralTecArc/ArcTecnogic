function getCarrinho() {
    const salvo = localStorage.getItem("arcCarrinho");
    return salvo ? JSON.parse(salvo) : [] //Converte se existir, caso contrario, lista vazia
}

function saveCarrinho(carrinho) {
    localStorage.setItem("arcCarrinho", JSON.stringify(carrinho));
}

function adicionarAoCarrinho(id) {
    const carrinho = getCarrinho();

    const item = carrinho.find(function (i) {  //Procura o item com id existente 
        return i.id === id;
    });

    if (item) {
        item.quantidade += 1;   //Aumenta a quantidade
    }else{
        carrinho.push({id: id, quantidade: 1}) //Novo entra com 1
    }
    saveCarrinho(carrinho);
}