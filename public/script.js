const data = {
    produtos: [
        {
            id: 1,
            nome: "iPhone 15",
            preco: 6999.90,
            categoria: "Celulares",
            imagem: "https://picsum.photos/300/200?1",
            descricao: "Smartphone Apple com câmera avançada.",
            emEstoque: true
        },
        {
            id: 2,
            nome: "Galaxy S24",
            preco: 5499.90,
            categoria: "Celulares",
            imagem: "https://picsum.photos/300/200?2",
            descricao: "Celular Samsung de última geração.",
            emEstoque: true
        },
        {
            id: 3,
            nome: "Notebook Dell",
            preco: 4200.00,
            categoria: "Notebooks",
            imagem: "https://picsum.photos/300/200?3",
            descricao: "Notebook ideal para estudos e trabalho.",
            emEstoque: false
        },
        {
            id: 4,
            nome: "MacBook Air",
            preco: 8999.90,
            categoria: "Notebooks",
            imagem: "https://picsum.photos/300/200?4",
            descricao: "Notebook Apple leve e poderoso.",
            emEstoque: true
        },
        {
            id: 5,
            nome: "Mouse Gamer",
            preco: 199.90,
            categoria: "Acessórios",
            imagem: "https://picsum.photos/300/200?5",
            descricao: "Mouse RGB com alta precisão.",
            emEstoque: true
        },
        {
            id: 6,
            nome: "Teclado Mecânico",
            preco: 349.90,
            categoria: "Acessórios",
            imagem: "https://picsum.photos/300/200?6",
            descricao: "Teclado mecânico com iluminação RGB.",
            emEstoque: true
        },
        {
            id: 7,
            nome: "PlayStation 5",
            preco: 4499.90,
            categoria: "Games",
            imagem: "https://picsum.photos/300/200?7",
            descricao: "Console de videogame da Sony.",
            emEstoque: false
        },
        {
            id: 8,
            nome: "Xbox Series X",
            preco: 4299.90,
            categoria: "Games",
            imagem: "https://picsum.photos/300/200?8",
            descricao: "Console Microsoft de nova geração.",
            emEstoque: true
        }
    ]
};



const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");



function formatPrice(preco) {

    return preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}



function createProductCard(produto) {

    const card = document.createElement("div");

    card.setAttribute("data-id", produto.id);

    card.classList.add("card");

    card.style.backgroundColor = "#ffffff";



    const img = document.createElement("img");

    img.setAttribute("src", produto.imagem);

    img.setAttribute("alt", produto.nome);



    const title = document.createElement("h3");

    title.classList.add("card-title");

    title.textContent = produto.nome;



    const price = document.createElement("p");

    price.textContent = formatPrice(produto.preco);



    const category = document.createElement("p");

    category.textContent = produto.categoria;



    const btnDetails = document.createElement("button");

    btnDetails.textContent = "Ver detalhes";

    btnDetails.addEventListener("click", () => {

        showProductDetails(produto);

    });



    const btnHighlight = document.createElement("button");

    btnHighlight.textContent = "Destacar";

    btnHighlight.addEventListener("click", () => {

        card.classList.toggle("highlight");

    });



    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(category);
    card.appendChild(btnDetails);
    card.appendChild(btnHighlight);



    return card;
}



function renderProducts(produtos) {

    productList.innerHTML = "";



    produtos.forEach(produto => {

        const card = createProductCard(produto);

        productList.appendChild(card);

    });



    const allCards = document.querySelectorAll(".card");

    allCards.forEach(card => {

        console.log("Card ID:", card.dataset.id);

        card.style.transition = "0.3s";

    });
}



function renderCategories() {

    const categorias = [
        "Todas",
        ...new Set(
            data.produtos.map(produto => produto.categoria)
        )
    ];



    categorySelect.innerHTML = "";



    categorias.forEach(cat => {

        const option = document.createElement("option");

        option.value = cat;

        option.textContent = cat;

        categorySelect.appendChild(option);

    });
}



function showProductDetails(produto) {

    productDetails.innerHTML = `
        <h2>${produto.nome}</h2>

        <img 
            src="${produto.imagem}" 
            alt="${produto.nome}" 
            width="250"
        >

        <p>
            <strong>Preço:</strong> 
            ${formatPrice(produto.preco)}
        </p>

        <p>
            <strong>Categoria:</strong> 
            ${produto.categoria}
        </p>

        <p>
            <strong>Estoque:</strong> 
            ${produto.emEstoque ? "Disponível" : "Indisponível"}
        </p>

        <p>
            <strong>Descrição:</strong> 
            ${produto.descricao}
        </p>
    `;
}



function filterProducts() {

    const textoBusca = searchInput.value.toLowerCase();

    const categoriaSelecionada = categorySelect.value;



    return data.produtos.filter(produto => {

        const matchNome =
            produto.nome
                .toLowerCase()
                .includes(textoBusca);



        const matchCategoria =
            categoriaSelecionada === "Todas" ||
            produto.categoria === categoriaSelecionada;



        return matchNome && matchCategoria;

    });
}



searchInput.addEventListener("input", () => {

    const produtosFiltrados = filterProducts();

    renderProducts(produtosFiltrados);

});



categorySelect.addEventListener("change", () => {

    const produtosFiltrados = filterProducts();

    renderProducts(produtosFiltrados);

});



btnRender.addEventListener("click", () => {

    const produtosFiltrados = filterProducts();

    renderProducts(produtosFiltrados);

});



renderCategories();

renderProducts(data.produtos);