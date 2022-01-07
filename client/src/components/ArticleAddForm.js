import React, { Component } from 'react';
import { Col, Row, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import Moment from 'moment';

class ArticleAddForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      title : '',
      yearOfPublication: Moment().format('YYYY'),
      subjectField : ''
    }
    this.handleInputChange = (evt) => {
      this.setState({
         [evt.target.name] : evt.target.value
      })
    }
  }
  render() {
    return (
      <div>
        <h5 className="articlesTitle">Add new paper</h5>
        <Form id = "articleForm">
      <FormGroup>
            <Label for="title">Title *</Label>
            <Input type="text" onChange={this.handleInputChange} name="title" />
            </FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup>
            <Label for="yearOfPublication">Publication Year *</Label>
            <Input type="number" onChange={this.handleInputChange} name="yearOfPublication" defaultValue={Moment().format('YYYY')} />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
            <Label for="subjectField">Subject Field *</Label>
            <Input type="text" onChange={this.handleInputChange} name="subjectField" />
            </FormGroup>
          </Col>
        </Row>
            <Button outline color="info" onClick={() => {
            this.props.onAdd({
              title : this.state.title,
              yearOfPublication : this.state.yearOfPublication,
              subjectField : this.state.subjectField,
              authorId : this.props.authorId
            })
            document.getElementById("articleForm").reset();
            this.setState({
              title : '',
              yearOfPublication : Moment().format('YYYY'),
              subjectField : ''
            })
            }}> Submit </Button>
        </Form>
      </div>
    );
  }
}

export default ArticleAddForm;
