export class HelloWorld extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.innerHTML += `
            <h1>Hola mundo, este es mi primer microfrontend</h1>
        `
    }
}

window.customElements.define('hello-world', HelloWorld)