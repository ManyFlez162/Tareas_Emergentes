document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('product-form')
    const nameInput = document.getElementById('name')
    const quantityInput = document.getElementById('quantity')
    const priceInput = document.getElementById('price')
    const saveButton = document.getElementById('save-product')

    const urlParams = new URLSearchParams(window.location.search)
    const productIdToEdit = urlParams.get('id')

    if (productIdToEdit) {
        fetch(`http://localhost:3000/api/productos/${productIdToEdit}`)
            .then(response => response.json())
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
                fetch(`http://localhost:3000/api/productos/${productIdToEdit}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(productData)
                })
                    .then(response => response.json())
                    .then(data => {
                        window.location.href = 'productos.html'
                    })
            } else {
                fetch(`http://localhost:3000/api/productos/${productIdToEdit}`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(productData)
                })
                    .then(response => response.json())
                    .then(data => {
                        window.location.href = 'productos.html'
                    })
            }
        } else {
            alert('Debe ingresar todos los campos')
        }
    })

})