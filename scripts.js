// Lista de produtos disponíveis
const produtos = [
  {
    name: "Pizza Margherita",
    prices: {
      s: 19.99,
      m: 22.99,
      l: 25.99,
    },
    image: "img/Pizza Margherita.jpg",
    description: "Uma deliciosa combinação de molho de tomate, queijo mussarela, manjericão fresco e azeite de oliva.",
  },
  {
    name: "Pizza de Filé",
    prices: {
      s: 22.99,
      m: 25.99,
      l: 28.99,
    },
    image: "img/Pizza de Filé.jpg",
    description: "Uma pizza saborosa com suculentas fatias de filé grelhado, molho de tomate e queijo derretido.",
  },
  {
    name: "Pizza de Cogumelo",
    prices: {
      s: 18.99,
      m: 21.99,
      l: 24.99,
    },
    image: "img/Pizza de Cogumelo.jpg",
    description: "Uma deliciosa pizza com cogumelos frescos, molho de tomate, queijo derretido e ervas aromáticas.",
  },
  // Adicione mais produtos aqui, se necessário
];

// Preços fixos dos tamanhos das pizzas
const pizzaPrices = {
  s: 2.0, // preço adicional para tamanho pequeno
  m: 4.0, // preço adicional para tamanho médio
  l: 6.0, // preço adicional para tamanho grande
};

// Variável para armazenar o número de itens no carrinho
let cartItems = 0;

// Variável para armazenar os produtos selecionados no carrinho
const cartItemsDetails = [];

// Função para adicionar um item ao carrinho
function adicionarAoCarrinho(index) {
  cartItems++;
  document.getElementById("cart-count").textContent = cartItems;

  const selectedSize = document.getElementById("size-select").value;
  const basePrice = produtos[index].prices[selectedSize];
  const totalPrice = basePrice + pizzaPrices[selectedSize];

  const productDetails = {
    name: produtos[index].name,
    price: totalPrice,
  };
  cartItemsDetails.push(productDetails);

  // Atualiza o menu lateral do carrinho com os itens e o total
  updateCartSidebar();
  // Mostra o menu lateral automaticamente ao adicionar um item
  cartSidebar.style.right = "0";
}

// Função para fechar o banner de promoção
function fecharBannerPromocao() {
  var banner = document.querySelector(".promotion-banner");
  banner.style.display = "none";
}

// Event listener para chamar a função quando o botão de fechamento for clicado
document.addEventListener("DOMContentLoaded", function () {
  var closeButton = document.querySelector(".close-btn");
  closeButton.addEventListener("click", fecharBannerPromocao);
});

// Função para calcular a média das avaliações
function calculateAverageRating() {
  // Aqui você pode adicionar a lógica para obter as avaliações dos depoimentos.
  // Por exemplo, você pode ter um array com as avaliações:
  const ratings = [9, 7, 3]; // Coloque as avaliações reais dos depoimentos aqui.

  if (ratings.length === 0) {
    return 0; // Retorna 0 caso não haja avaliações (para evitar divisão por zero).
  }

  const sum = ratings.reduce((total, rating) => total + rating, 0);
  const average = sum / ratings.length;
  return average.toFixed(1); // Retorna a média arredondada com uma casa decimal.
}

// Atualiza a exibição da média de avaliação no HTML
function updateAverageRating() {
  const averageRating = calculateAverageRating();
  const averageRatingElement = document.getElementById("average-rating");
  const averageCategoryElement = document.getElementById("average-category");

  averageRatingElement.textContent = averageRating;

  // Defina as categorias de acordo com a média de avaliação
  let category = "";
  if (averageRating >= 9) {
    category = "Excelente";
  } else if (averageRating >= 7) {
    category = "Muito Bom";
  } else if (averageRating >= 5) {
    category = "Bom";
  } else if (averageRating >= 3) {
    category = "Regular";
  } else {
    category = "Insatisfatório";
  }

  averageCategoryElement.textContent = category;
}

// Chame a função para atualizar a média de avaliação assim que a página carregar
document.addEventListener("DOMContentLoaded", updateAverageRating);

// Referências aos elementos do menu lateral do carrinho
const cartSidebar = document.getElementById("cart-sidebar");
const cartItemsList = document.getElementById("cart-items-list");
const cartTotalSidebar = document.getElementById("cart-total-sidebar");
const closeCartSidebar = document.getElementById("close-cart-sidebar");
const cartLink = document.getElementById("cart-link");
const sizeSelect = document.getElementById("size-select"); // Referência ao elemento de seleção do tamanho da pizza

// Função para atualizar o preço exibido com base no tamanho selecionado
function atualizarPreco() {
  const selectedProductIndex = sizeSelect.selectedIndex; // Obter o índice do produto selecionado
  const selectedSize = sizeSelect.value; // Obter o tamanho selecionado
  const basePrice = produtos[selectedProductIndex].prices[selectedSize]; // Obter o preço base do produto com base no tamanho selecionado
  const additionalPrice = pizzaPrices[selectedSize]; // Obter o preço adicional com base no tamanho selecionado
  const totalPrice = basePrice + additionalPrice; // Calcular o preço total com base no preço base e adicional

  // Atualizar o preço exibido no HTML
  const priceElement = document.getElementById("product-price");
  priceElement.textContent = "R$ " + totalPrice.toFixed(2);
}

// Adicionar Event Listener para detectar mudanças na seleção
sizeSelect.addEventListener("change", atualizarPreco);

// Função para atualizar o menu lateral do carrinho com os itens e o total
function updateCartSidebar() {
  cartItemsList.innerHTML = ""; // Limpa a lista de itens do carrinho

  // Adiciona cada item do carrinho à lista no menu lateral
  cartItemsDetails.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item.name + " - R$ " + item.price.toFixed(2);
    cartItemsList.appendChild(listItem);
  });

  // Calcula o total do carrinho e exibe no menu lateral
  const cartTotal = cartItemsDetails.reduce((total, item) => total + item.price, 0);
  cartTotalSidebar.textContent = "R$ " + cartTotal.toFixed(2);
}

// Função para esconder o menu lateral do carrinho
function fecharMenuLateral() {
  cartSidebar.style.transition = "none"; // Remove a transição para fechar rapidamente
  cartSidebar.style.right = "-350px";

  // Define um pequeno timeout para reativar a transição após 300ms
  setTimeout(() => {
    cartSidebar.style.transition = ""; // Volta a utilizar a transição padrão
  }, 300); // 300ms é um valor aproximado para o tempo da transição, ajuste conforme necessário
}

// Evento de clique no botão "Confirmar"
document.querySelector(".confirm-btn").addEventListener("click", confirmarCompra);

// Evento de clique no ícone do carrinho para mostrar o menu lateral
cartLink.addEventListener("click", () => {
  // Atualiza o conteúdo do menu lateral
  updateCartSidebar();
  // Mostra o menu lateral automaticamente
  cartSidebar.style.right = "0";
});

// Evento de clique no botão "Adicionar mais item"
document.querySelector(".add-more-btn").addEventListener("click", () => {
  // Fecha o menu lateral ao clicar em "Adicionar mais item"
  fecharMenuLateral();
});

// Event listener para chamar a função quando o botão "Fechar" do menu lateral for clicado
document.addEventListener("DOMContentLoaded", function () {
  closeCartSidebar.addEventListener("click", fecharMenuLateral);
});

// Função para confirmar a compra e limpar o carrinho
function confirmarCompra() {
  // ... (código existente)

  // Limpar o carrinho
  cartItems = 0;
  cartItemsDetails.length = 0;
  document.getElementById("cart-count").textContent = cartItems;

  // Atualizar o menu lateral do carrinho
  updateCartSidebar();

  // Esconder o menu lateral após a confirmação da compra
  cartSidebar.style.right = "-350px";
}

// Evento de clique no botão "Confirmar"
document.querySelector(".confirm-btn").addEventListener("click", confirmarCompra);

// Evento de clique no ícone do carrinho para mostrar o menu lateral
cartLink.addEventListener("click", () => {
  // Atualiza o conteúdo do menu lateral
  updateCartSidebar();
  // Mostra o menu lateral automaticamente
  cartSidebar.style.right = "0";
});

// Função para rolar suavemente de volta ao topo da página
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Mostrar ou ocultar o botão "Voltar ao Topo" com base no scroll da página
window.addEventListener('scroll', function() {
  var scrollToTopBtn = document.getElementById("scroll-to-top-btn");
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add("active");
  } else {
    scrollToTopBtn.classList.remove("active");
  }
});

// Formulário de assinatura da newsletter
function validarFormularioNewsletter() {
  const emailInput = document.querySelector('input[name="email"]');
  const email = emailInput.value;
  const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  if (!emailPattern.test(email)) {
    alert("Por favor, insira um endereço de e-mail válido.");
    return false; // Impede o envio do formulário
  }
}

// Adicione um event listener para chamar a função ao enviar o formulário
const formularioNewsletter = document.querySelector('.newsletter form');
formularioNewsletter.addEventListener('submit', validarFormularioNewsletter);

// Redirecionar o usuário para a página de login após confirmar a compra
function redirecionarParaLogin() {
  window.location.href = "login.html"; // Substitua "login.html" pelo caminho da sua página de login
}
