//Verificando se o Java esta funcionando
console.log("scripts.js carregou!")

//Seleciona todos os botões do menu
const menuItems = document.querySelectorAll(".menu-item");
console.log(menuItems.length);


//Seleciona todas as telas
const page = document.querySelectorAll(".page");

//Local dos Cards
const grade = document.querySelector("#product-grid")

//Função de desenho dos Cards
function desenharProdutos(categoria) {

    grade.replaceChildren();    //Esvazia a Grade
    const fitrados = produtos.filter(function (produto) {
        return produto.categoria === categoria; //So os que combina para serem
    });

    if (fitrados.length === 0) { //Categoria sem produtos
        const aviso = document.createElement("p");
        aviso.textContent = "Nenhum produto nesta categoria ainda.";
        grade.appendChild(aviso);
    }

    fitrados.forEach(function (produto) { //Para cada Produto da lista

        const foto = document.createElement("img")
        foto.src = produto.imagem                       //Endereço da Imagem
        foto.alt = produto.nome                         //Texto da Imagem

        const card = document.createElement("article"); //Tag <article>
        card.className = ("product-card");              //Dá a classe a tela

        const titulo = document.createElement("h3"); //Tag h3
        titulo.textContent = produto.nome;           //Escreve o nome dentro

        const descricao = document.createElement("p"); //Tag descrião
        descricao.textContent = produto.descricao;     //Escreve a descrição dentro

        const botao = document.createElement("button");//Tag botão carrinho
        botao.textContent = "Adicionar ao carrinho";

        botao.addEventListener("click", function () { //Adiciona produto ao carrinho
            adicionarAoCarrinho(produto.id)
        });

        const preco = document.createElement("strong"); //Tag preço
        preco.textContent = produto.preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });

        card.appendChild(foto)       //Foto
        card.appendChild(titulo);    //Titulo dentro do Card
        card.appendChild(descricao); //Descrição
        card.appendChild(preco);     //Preço
        card.appendChild(botao);     //Botão
        grade.appendChild(card);     //Card dentro da grade
    });
}
const botoesCategoria = document.querySelectorAll(".sidebar .menu-item"); //Lê o data-category

botoesCategoria.forEach(function (botaoCategoria) { //Desenha a categoria selecionada

    botaoCategoria.addEventListener("click", function () {
        const categoria = botaoCategoria.dataset.category;
        desenharProdutos(categoria);

        botoesCategoria.forEach(function (outro) { //Tira os destaques dos outros
            outro.classList.remove("active");
        });
        botaoCategoria.classList.add("active"); //Destaca a categoria selecionada
    });
});
//Desanha os Produtos
desenharProdutos("computadores");