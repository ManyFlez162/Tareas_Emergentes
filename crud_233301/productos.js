document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById("product-list")
    const searchInput = document.getElementById("search")
    const addProductButton = document.getElementById("add-product")

    console.log(window.navigator)
    console.log(window.location)
    console.log('Ancho de la pantalla: ' + window.screen.width + ' px')
    console.log('Alto de la pantalla: ' + window.screen.height + ' px')

    // Función para cargar y mostrar la lista de productos
    function getProducts() {
        fetch('http://localhost:3000/api/productos')
            .then(response => response.json())
            .then(data => {
                productList.innerHTML = ''

                data.forEach(product => {
                    const productItem = document.createElement('li')
                    productItem.innerHTML = `
                        <p><strong>Nombre: </strong> ${product.nombre}</p>
                        <p><strong>Precio: </strong> ${product.precio}</p>
                        <p><strong>Cantidad: </strong> ${product.cantidad}</p>
                        <button data-id="${product._id}" class="edit-product">Editar</button>
                        <button data-id="${product._id}" class="delete-product">Eliminar</button>
                    `
                    productList.appendChild(productItem)
                });
            })
    }

    getProducts()

    addProductButton.addEventListener('click', function () {
        window.location.href = 'formulario.html'
    })

    // Agregar comportamiento de buscado de productos
    searchInput.addEventListener('input', function () {
        const filtro = searchInput.ariaValueMax
        if (filtro.trim() == '') {
            getProducts()
        } else {
            fetch(`http://localhost:3000/api/productos/filtro/${filtro}`)
                .then(response => response.json())
                .then(data => {
                    productList.innerHTML = '';

                    data.forEach(element => {
                        const productItem = document.createElement('li')
                        productItem.innerHTML = `
                            <p><strong>Nombre: <strong>${element.nombre}</p>
                            <p><strong>Nombre: <strong>${element.precio}</p>
                            <p><strong>Nombre: <strong>${element.cantidad}</p>
                            <button data-id="${element._id}" class="edit-product">Editar</button>
                            <button data-id="${element._id}" class="delete-product">Eliminar</button>
                        `
                        productList.appendChild(productItem)
                    });
                })
        }
    })

    productList.addEventListener("click", function (e) {
        if (e.target.classList.contains('edit-product')) {
            const productId = e.target.getAttribute('data-id')
            window.location.href = `formulario.html ? id = ${productId}`
        } else if (e.target.classList.contains('delete-product')) {
            const productId = e.target.getAttribute('data-id')
            if (confirm('¿Estas seguro de eliminar este producto?')) {
                fetch(`http://localhost:3000/api/productos/${productId}`, {
                    method: 'DELETE'
                }).then(response => response.json())
                    .then(data => {
                        alert('Producto eliminado con exito')
                        e.target.parentElement.remove()
                    })
            }
        } else {
            return
        }
    })

})