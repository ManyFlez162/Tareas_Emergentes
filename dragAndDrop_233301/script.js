// Obtener todos los elementos draggables
const draggables = document.querySelectorAll('.draggable')

// Zona donde se soltarán los elementos
const dropZone = document.getElementById('dropZone')

// Recorremos el array de elementos arrastables
draggables.forEach(item => {
    // Este evento 'draggstart' se activa cuando el usuario arrastra el elemento
    item.addEventListener('dragstart', e => {
        // e.dataTransfer este es el objeto que almacena la información durante el arrastre
        e.dataTransfer.setData('text/plain', item.id)
    })
})

// El evento 'dragover' se dispara constantemente cuando un elemento es arrastrado sobre la zona
dropZone.addEventListener('dragover', e => {
    e.preventDefault()
    dropZone.classList.add('over')
})

// 'dragleave' se dispara cuando el elemento arrastrado sale de la zona de arrastre
dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('over')
})

// Se dispara cuando el elemento es soltado dentro de la zona
dropZone.addEventListener('drop', e => {
    e.preventDefault()
    dropZone.classList.remove('over')
    const id = e.dataTransfer.getData('text/plain')
    const draggetItem = document.getElementById(id)
    dropZone.appendChild(draggetItem)
})