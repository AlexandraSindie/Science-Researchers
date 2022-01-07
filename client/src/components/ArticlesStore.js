import axios from 'axios'
import {EventEmitter} from 'fbemitter'

const SERVER = 'http://localhost:8080'

class ArticlesStore{
    constructor(){
        this.emitter = new EventEmitter()
        this.content = []
    }
    async getAll(){
        try {
            let articles = await axios(`${SERVER}/articles`)
            this.content = articles.data
            this.emitter.emit('ARTICLES_LOAD')
        } catch (e) {
            console.warn(e)
            this.emitter.emit('ARTICLES_ERROR')
        }
    }
    async addOne(article){
        try {
            await axios.post(`${SERVER}/articles`, article)
            this.emitter.emit('ARTICLE_ADD')
        } catch (e) {
            console.warn(e)
            console.log(article);
            this.emitter.emit('ADD_ERROR')
        }
    }
    async deleteOne(id){
        try {
            await axios.delete(`${SERVER}/articles/${id}`)
            this.emitter.emit('ARTICLE_DELETE')
        } catch (e) {
            console.warn(e)
            this.emitter.emit('DELETE_ERROR')
        }
    }
    async saveOne(id, article){
        try {
            await axios.put(`${SERVER}/articles/${id}`, article)
            this.emitter.emit('ARTICLE_SAVE')
        } catch (e) {
            console.warn(e)
            this.emitter.emit('SAVE_ERROR')
        }
    }
    getEmitter(){
        return this.emitter
    }
}

export default ArticlesStore