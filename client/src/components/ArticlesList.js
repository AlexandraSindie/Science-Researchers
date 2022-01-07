import React, { Component } from 'react';
import ArticlesStore from './ArticlesStore'
import Article from './Article'
import ArticleAddForm from './ArticleAddForm'

class ArticlesList extends Component {
  constructor(){
    super()
    this.store = new ArticlesStore()
    this.emitter = this.store.getEmitter()
    this.state = {
      articles : [],
      authorId: ''
    }
    this.add = (article) => {
      this.store.addOne(article)
      this.emitter.addListener('ARTICLE_ADD', () => {
        this.store.getAll()
      })
    }
    this.delete = (id) => {
      this.store.deleteOne(id)
      this.emitter.addListener('ARTICLE_DELETE', () => {
        this.store.getAll()
      })
    }
    this.save = (id, article) => {
      this.store.saveOne(id, article)
      this.emitter.addListener('ARTICLE_SAVE', () => {
        this.store.getAll()
      })
    }
  }
  componentDidMount(){
    this.store.getAll()
    this.emitter.addListener('ARTICLES_LOAD', () => {
      this.setState({
        articles : this.store.content,
        authorId: this.props.authorId
      })
    })
  }
  render() {
    return (
        <div id="articles">
          <div>
            <h4 className="articlesTitle">Articles</h4>
            <hr />
                {this.state.articles.filter((e) => e.authorId === Number(this.state.authorId)).sort(function(a, b) {
                if(a.yearOfPublication < b.yearOfPublication) return -1;
                if(a.yearOfPublication > b.yearOfPublication) return 1;
                return 0; }).map((e) =>
                  <Article key={e.id} content={e} onDelete={() => {
                    if (window.confirm('Are you sure?')) {
                      this.delete(e.id);
                    }
                  }}
                  onSave={this.save} />
                  )}
            
          </div>
          <hr />
          <ArticleAddForm onAdd={this.add} authorId= {this.state.authorId} />
        </div>
    )
  }
}

export default ArticlesList;
