export default class User {
    constructor(nombre, apellido) {
        this.nombre = nombre
        this.apellido = apellido
    }

    saludar(){
        console.log(`Hola mi nombre es ${this.nombre}`)
    }
}