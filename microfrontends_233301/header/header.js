export class HeaderComponent extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode: 'open'})
        this.#agregarEstilos(shadow)
        this.#render(shadow)
    }

    #render(shadow) {
        shadow.innerHTML += `
            <header>
                <h1>Microfrontend Header</h1>
            </header>
        `
    }

    #agregarEstilos(shadow) {
        let link = document.createElement('link')
        link.setAttribute('rel', 'stylesheet')
        link.setAttribute('href', './header/header.css')
        shadow.appendChild(link)
    }
}