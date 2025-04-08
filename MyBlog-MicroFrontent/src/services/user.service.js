export class UserService {
    #urlService = 'https://jsonplaceholder.typicode.com/users/'
    
    async obtenerUsuario(userId) {
        let response = await fetch(this.#urlService + userId)
        let json = response.json()
        return json
    }
}