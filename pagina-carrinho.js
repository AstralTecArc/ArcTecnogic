const lista = document.querySelector("#lista-carrinho");
const totalTexto = document.querySelector("#total");

function desenharCarrinho() {
    lista.replaceChildren(); //Limpa a lista antes de desenhar
    totalTexto.textContent = ""; //Reseta o total
    const carrinho = getCarrinho();

    if (carrinho.length === 0) {
        const vazio = document.createElement("p");
        vazio.textContent = "Carrinho vazio";
        lista.appendChild(vazio);
        return;
    }

    let total = 0;

    carrinho.forEach(function (item) {

        const produto = produtos.find(function (p) {
            return p.id === item.id;
        });

        if (!produto) return; //Se não encontrar o produto, ignora

        const subtotal = produto.preco * item.quantidade;
        total += subtotal;

        // Foto do produto
        const foto = document.createElement("img");
        foto.src = produto.imagem;
        foto.alt = produto.nome;

        // Nome e Preço do produto
        const nome = document.createElement("h3");
        nome.textContent = produto.nome;

        const precoUnitario = document.createElement("p");
        precoUnitario.textContent = formatarPreco(produto.preco);

        const info = document.createElement("div");
        info.className = "cart-info"
        info.append(nome, precoUnitario);

        // Quantidade do Produto
        const menos = document.createElement("button");
        menos.textContent = "-";
        menos.addEventListener("click", function () {
            alterarQuantidade(item.id, -1);
            desenharCarrinho();
        });

        const quantidade = document.createElement("span");
        quantidade.textContent = item.quantidade;

        const mais = document.createElement("button");
        mais.textContent = "+";
        mais.addEventListener("click", function () {
            alterarQuantidade(produto.id, 1);
            desenharCarrinho();
        });

        const controle = document.createElement("div");
        controle.className = "cart-qty";
        controle.append(menos, quantidade, mais);

        // Subtotal e botão remover
        const subtotalTexto = document.createElement("strong");
        subtotalTexto.textContent = formatarPreco(subtotal);

        const remover = document.createElement("button");
        remover.className = "cart-remove";
        remover.textContent = "Remover";
        remover.addEventListener("click", function () {
            removerDoCarrinho(produto.id);
            desenharCarrinho();
        });

        //Junta tudo numa linha
        const linha = document.createElement("div");
        linha.className = "cart-item";
        linha.append(foto, info, controle, subtotalTexto, remover);

        lista.appendChild(linha);
    });

    totalTexto.textContent = "Total: " + formatarPreco(total);
}

desenharCarrinho();