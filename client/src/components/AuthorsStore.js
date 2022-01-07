import axios from 'axios'
import {EventEmitter} from 'fbemitter'

const SERVER = 'http://localhost:8080'

class AuthorsStore{
    constructor(){
        this.emitter = new EventEmitter()
        this.content = []
    }
    async getAll(){
        try {
            let authors = await axios(`${SERVER}/authors`)
            this.content = authors.data
            this.emitter.emit('AUTHORS_LOAD')
        } catch (e) {
            console.warn(e)
            this.emitter.emit('AUTHORS_ERROR')
        }
    }
    async addOne(author){
        try {
            await axios.post(`${SERVER}/authors`, author)
            this.emitter.emit('AUTHOR_ADD')
        } catch (e) {
            console.warn(e)
            this.emitter.emit('ADD_ERROR')
        }
    }
    async deleteOne(id){
        try {
            await axios.delete(`${SERVER}/authors/${id}`)
            this.emitter.emit('AUTHOR_DELETE')
        } catch (e) {
            console.warn(e)
            this.emitter.emit('DELETE_ERROR')
        }
    }
    async saveOne(id, author){
        try {
            await axios.put(`${SERVER}/authors/${id}`, author)
            this.emitter.emit('AUTHOR_SAVE')
        } catch (e) {
            console.warn(e)
            this.emitter.emit('SAVE_ERROR')
        }
    }
    getEmitter(){
        return this.emitter
    }
}

export default AuthorsStore;