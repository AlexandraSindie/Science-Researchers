import React, { Component } from 'react';
import ArticlesList from './ArticlesList';
import { Input, Button } from 'reactstrap';
import Moment from 'moment';

class Author extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      showingArticles: false,
      lastName: this.props.content.lastName,
      firstName: this.props.content.firstName,
      dateOfBirth: Moment(this.props.content.dateOfBirth).format('YYYY-MM-DD'),
      specialisation: this.props.content.specialisation,
      university: this.props.content.university
    }
    this.handleInputChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }
    this.handleShowArticles = () => {
      this.setState({
        showingArticles: !this.state.showingArticles
      })
    }
  }
  render() {
    if (!this.state.isEditing) {
      return (
        <div>
          <h3 className="lastName"> {this.state.lastName}, </h3>
          <h5> {this.state.firstName} </h5>
          <h6> {this.state.specialisation} at {this.state.university} </h6>
          <p> Born: {Moment(this.state.dateOfBirth).format('D MMMM YYYY')} </p>
          
          <Button outline color="secondary" onClick={() => this.setState({isEditing : true})}>Edit</Button> &nbsp;
          <Button outline color="secondary" onClick={() => this.props.onDelete(this.props.content.id)}>Delete</Button> &nbsp;
          <Button outline color="info" onClick={this.handleShowArticles}>{this.state.showingArticles ? "Hide Articles" : "Show Articles"} </Button>
                     
          <div style={this.state.showingArticles ? {} : { display: 'none' }}>
              <ArticlesList authorId={this.props.content.id} />
           </div>
          <hr />
        </div>
      );
    }
    else {
      return (
        <div>
          <h3><Input type="text" className="input" onChange={this.handleInputChange} value={this.state.lastName} name="lastName"/> </h3>
          <h5><Input type="text" className="input" onChange={this.handleInputChange} value={this.state.firstName} name="firstName" /> </h5>
          <p> <Input type="text" className="input" onChange={this.handleInputChange} value={this.state.specialisation} name="specialisation"/> at <Input type="text" className="input" onChange={this.handleInputChange} value={this.state.university} name="university"/> </p>
          <p> Born: <Input type="date" className="input" onChange={this.handleInputChange} value={Moment(this.state.dateOfBirth).format('YYYY-MM-DD')} name="birthDate"/> </p>
          <Button outline color="secondary" onClick={() => {
              this.props.onSave(this.props.content.id,  {
                lastName : this.state.lastName,
                firstName : this.state.firstName,
                dateOfBirth : this.state.dateOfBirth,
                specialisation : this.state.specialisation,
                university: this.state.university
              })
              this.setState({isEditing : false});
            }
          }> OK </Button> &nbsp;
          <Button outline color="secondary" onClick={() => this.setState({isEditing : false})} onChange={this.handleInputChange}> Cancel </Button> &nbsp;
          <hr />
        </div>
      )
    }
  }
} 

export default Author;
