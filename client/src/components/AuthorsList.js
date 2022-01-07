import React, { Component } from 'react';
import AuthorsStore from './AuthorsStore'
import Author from './Author'
import AuthorAddForm from './AuthorAddForm'
import { Row, Col } from 'reactstrap';

class AuthorsList extends Component {
  constructor(){
    super()
    this.store = new AuthorsStore()
    this.emitter = this.store.getEmitter()
    this.state = {
      authors : []
    }
    this.add = (author) => {
      this.store.addOne(author)
      this.emitter.addListener('AUTHOR_ADD', () => {
        this.store.getAll()
      })
    }
    this.delete = (id) => {
      this.store.deleteOne(id)
      this.emitter.addListener('AUTHOR_DELETE', () => {
        this.store.getAll()
      })
    }
    this.save = (id, author) => {
      this.store.saveOne(id, author)
      this.emitter.addListener('AUTHOR_SAVE', () => {
        this.store.getAll()
      })
    }
    this.compare = (a,b) => {
  if (a.lastName < b.lastName)
    return -1;
  if (a.lastName > b.lastName)
    return 1;
  return 0;
}
  }
  componentDidMount(){
    this.store.getAll()
    this.emitter.addListener('AUTHORS_LOAD', () => {
      this.setState({
        authors : this.store.content
      })
    })
  }
  render() {
    return (
        <Row>
        <Col xs="12" sm="6" id="authorsList">
            <h1 id="authorsTitle">Authors</h1>
            <hr /> <hr />
            {
              this.state.authors.sort(function(a, b) {
                if(a.lastName.toLowerCase() < b.lastName.toLowerCase()) return -1;
                if(a.lastName.toLowerCase() > b.lastName.toLowerCase()) return 1;
                return 0; }).map((e) => 
                  <Author key={e.id} content={e} onDelete={() => {
                    if (window.confirm('Are you sure?')) {
                      this.delete(e.id);
                    }
                  }}
                  onSave={this.save}/>
              )
            }
            </Col>
            <Col xs="12" sm="6" lg="5">
          <AuthorAddForm onAdd={this.add} />
          </Col>
        </Row>
    )
  }
}

export default AuthorsList;
