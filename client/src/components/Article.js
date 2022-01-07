import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';

class Article extends Component {
  constructor(props){
    super(props)
    this.state = {
      isEditing : false,
      title : this.props.content.title,
      yearOfPublication : this.props.content.yearOfPublication,
      subjectField : this.props.content.subjectField
    }
    this.handleInputChange = (evt) => {
      this.setState({
         [evt.target.name] : evt.target.value
      })
    }
  }
  render() {
    if (!this.state.isEditing){
      return (
        <div>
          <h5> {this.props.content.title} [{this.props.content.yearOfPublication}] </h5>     
          <p> Subject Field: {this.props.content.subjectField}  </p>
          <Button outline color="info" onClick={() => this.setState({isEditing : true})}> Edit </Button> &nbsp;
          <Button outline color="info" onClick={() => this.props.onDelete(this.props.content.id)}> Delete </Button> 
          <hr />
        </div>
      );      
    }
    else{
      return (
        <div>
          <h5> Title: </h5> <Input type="text" className="input" onChange={this.handleInputChange} value={this.state.title} name="title"/> 
          <p> Year Of Publication: </p><Input type="text" className="input" onChange={this.handleInputChange} value={this.state.yearOfPublication} name="yearOfPublication"/>
          <p> Subject Field: </p> <Input type="text" className="input" onChange={this.handleInputChange} value={this.state.subjectField} name="subjectField"/>
          <Button outline color="info" onClick={() => {
              this.props.onSave(this.props.content.id,  {
                title : this.state.title,
                yearOfPublication : this.state.yearOfPublication,
                subjectField : this.state.subjectField
              })
              this.setState({isEditing : false})
            }
          }> OK </Button> &nbsp;
          <Button outline color="info" type="button" onClick={() => this.setState({isEditing : false})} onChange={this.handleInputChange}> Cancel </Button>
          <hr />
        </div>
        )
    }
  }
}

export default Article;
