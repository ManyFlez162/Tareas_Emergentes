export class FooterComponent extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const shadow = this.attachShadow({mode: 'open'})
        this.#agregarEstilos(shadow)
        this.#render(shadow)
    }

    #render(shadow) {
        shadow.innerHTML += `
            <footer>
                <p>2025 Microfrontends</p>
            </footer>
        `
    }

    #agregarEstilos(shadow) {
        let link = document.createElement('link')
        link.setAttribute('rel', 'stylesheet')
        link.setAttribute('href', './footer/footer.css')
        shadow.appendChild(link)
    }
}