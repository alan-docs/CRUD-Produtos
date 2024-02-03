document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('productForm');
    const productTable = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    let products = [];
    let editingId = null;

    // Função para formatar o preço como moeda
    function formatPrice(value) {
        return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // Adiciona ou atualiza um produto
    form.onsubmit = (e) => {
        e.preventDefault();
        const productName = document.getElementById('productName').value;
        let productPrice = document.getElementById('productPrice').value;
        productPrice = productPrice.replace(/[R$\.,]/g, "");
        productPrice = parseFloat(productPrice) / 100;

        if (editingId) {
            // Atualiza o produto
            products = products.map(p => p.id === editingId ? { id: editingId, name: productName, price: productPrice } : p);
            editingId = null;
        } else {
            // Adiciona um novo produto
            const newProduct = {
                id: Date.now(),
                name: productName,
                price: productPrice
            };
            products.push(newProduct);
        }
        renderProducts();
        form.reset();
    };

    // Exclui um produto
    function deleteProduct(id) {
        products = products.filter(p => p.id !== id);
        renderProducts();
    }

    // Edita um produto
    function editProduct(id) {
        const product = products.find(p => p.id === id);
        if (product) {
            document.getElementById('productName').value = product.name;
            document.getElementById('productPrice').value = formatPrice(product.price);
            editingId = id;
        }
    }

    // Renderiza os produtos na tabela
    function renderProducts() {
        productTable.innerHTML = '';
        products.forEach(product => {
            let row = productTable.insertRow();
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${formatPrice(product.price)}</td>
                <td>
                    <button onclick="editProduct(${product.id})">Editar</button>
                    <button onclick="deleteProduct(${product.id})">Excluir</button>
                </td>
            `;
        });
    }

    // Adiciona funções globais para editar e excluir
    window.editProduct = editProduct;
    window.deleteProduct = deleteProduct;
});
