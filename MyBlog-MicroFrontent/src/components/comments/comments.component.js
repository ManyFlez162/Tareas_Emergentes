import { PostService } from "../../services/post.service.js";

export class Comments extends HTMLElement {
    #postService = new PostService()

    constructor() {
        super()
    }

    connectedCallback() {
        const postId = this.getAttribute('postId')
        const shadow = this.attachShadow({mode: 'open'})

        this.#agregarEstilos(shadow)
        this.#render(shadow)
        this.#consultarComentarios(postId, shadow)
    }

    #render(shadow) {
        shadow.innerHTML += `
            <details>
                <summary class="date">
                    <img src="../../assets/gifts/comment.gif" alt="comment-gif">
                    <a href="#">Comentarios (<span id="cantidad"></span>)</a>
                </summary>
                <div id="divComments" class="comments">

                </div>
            </details>
            <template id="tmpComment">
                <div class="commentsbox">
                    <p><b id="user"></b> dice:</p>
                    <p id="body"></p>
                </div>
            </template>
        `
    }

    #agregarEstilos(shadow) {
        let link = document.createElement('link')
        link.setAttribute('rel', 'stylesheet')
        link.setAttribute('href', '../src/components/comments/comments.component.css')
        shadow.appendChild(link)
    }

    #consultarComentarios(postId, shadow) {
        this.#postService.obtenerComentarios(postId)
            .then(comments => {
                let span = shadow.querySelector('#cantidad')
                span.innerHTML = comments.length
                let div = shadow.querySelector('#divComments')
                let tmp  = shadow.querySelector('#tmpComment')
                comments.forEach(comment => this.#desplegarComentario(tmp, div, comment));
            })
    }

    #desplegarComentario(tmp, div, comment) {
        let clone = tmp.content.cloneNode(true)
        let element = clone.querySelector('#user')
        element.innerHTML = comment.email
        element = clone.querySelector('#body')
        element.innerHTML = comment.body
        div.appendChild(clone)
    }

}

