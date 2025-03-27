import ProductoService from "../servicios/producto.service"

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('product-form')
    const nameInput = document.getElementById('name')
    const quantityInput = document.getElementById('quantity')
    const priceInput = document.getElementById('price')
    const saveButton = document.getElementById('save-product')

    const urlParams = new URLSearchParams(window.location.search)
    const productIdToEdit = urlParams.get('id')

    if (productIdToEdit) {
        ProductoService.getProductById(productIdToEdit)
            .then(product => {
                nameInput.value = product.nombre
                priceInput.value = product.precio
                quantityInput.value = product.cantidad
            })
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault()
        const name = nameInput.value
        const price = parseFloat(priceInput.value)
        const quantity = parseInt(quantityInput.value)

        if (name && price && quantity) {
            const productData = {
                nombre: name,
                precio: price,
                cantidad: quantity
            }

            if (productIdToEdit) {
                ProductoService.editProduct(productIdToEdit, productData)
                    .then(data => {
                        window.location.href = 'productos.html'
                    })
            } else {
                ProductoService.addProduct(productData)
                    .then(data => {
                        window.location.href = 'productos.html'
                    })
            }
        } else {
            alert('Debe ingresar todos los campos')
        }
    })

})