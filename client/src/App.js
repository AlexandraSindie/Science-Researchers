import React, { Component } from 'react';
import AuthorsList from './components/AuthorsList'
import { Container, Row } from 'reactstrap';
import './App.css';

class App extends Component {
  render() {
    return (
      <Container fluid className="App">
        <Row id="header" >
          <h1 className="display-5"> Science Researchers Conference </h1>
        </Row>
        <AuthorsList />
      </Container>
    );
  }
}

export default App;
