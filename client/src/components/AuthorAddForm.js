import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import Moment from 'moment';

class AuthorAddForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      lastName : '',
      firstName : '',
      dateOfBirth : Moment().format(),
      specialisation : '',
      university : ''
    }
    this.handleInputChange = (evt) => {
      this.setState({
         [evt.target.name] : evt.target.value
      })
    }
  }
  render() {
    return (
      <div id="authorsAddForm">
      <h3> Add new author </h3>
      <hr id="authorsAddFormLine" />
        <Form id="authorForm">
        <Row form>
          <Col md={6}>
            <FormGroup>
            <Label for="lastName">Last Name *</Label>
            <Input type="text" onChange={this.handleInputChange} name="lastName" />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
            <Label for="firstName">First Name *</Label>
            <Input type="text" onChange={this.handleInputChange} name="firstName" />
            </FormGroup>
          </Col>
        </Row>
          <Row form>
          <Col md={4}>
            <FormGroup>
            <Label for="dateOfBirth">Date Of Birth *</Label>
            <Input type="date" onChange={this.handleInputChange} name="dateOfBirth" defaultValue={Moment("1980-01-01").format('YYYY-MM-DD')} />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
            <Label for="specialisation">Specialisation *</Label>
            <Input type="text" onChange={this.handleInputChange} name="specialisation" />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
            <Label for="university">University *</Label>
            <Input type="text" onChange={this.handleInputChange} name="university" />
            </FormGroup>
          </Col>
        </Row>
            <Button outline color="warning" onClick={() => {
            this.props.onAdd({
              lastName : this.state.lastName,
              firstName : this.state.firstName,
              dateOfBirth : this.state.dateOfBirth,
              specialisation : this.state.specialisation,
              university : this.state.university
            }) 
            document.getElementById("authorForm").reset();
            this.setState({
              lastName : '',
              firstName : '',
              dateOfBirth : Moment().format(),
              specialisation : '',
              university : ''
            })
            }} > Submit </Button>
        </Form>
      </div>
    );
  }
}

export default AuthorAddForm;
