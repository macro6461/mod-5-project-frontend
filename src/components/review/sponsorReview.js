import React, { Component } from 'react'
import { Image, Form, Button, Dropdown } from 'semantic-ui-react'

import { connect } from 'react-redux'

class SponsorReview extends Component {

  state = {
    rating: 1,
    body: "",
    facility_id: ""
  }

  componentDidMount = () => {
    console.log(this.props)
  }

  handleOnChange = (event) => {

    this.setState({
      [event.target.name]: event.target.value,

    })
  }

  handleDropChange = (event) => {
    console.log(event.target.children[0].innerText)

    this.setState({
      rating: parseInt(event.target.children[0].innerText)
    })
  }

  handleSubmit = (event) => {


    event.preventDefault()
        fetch('http://localhost:3000/sponsor_reviews', {
          headers: {"Content-Type": "application/json",
          "Accept":"application/json"},
          method: "POST",
          body: JSON.stringify({
            sponsor_id: this.props.currentSponsor.id,
            rating: this.state.rating,
            body: this.state.body,
            facility_id: this.props.facilityId
          })
        })
        .then(res => res.json())
        .then(json => console.log(json))
  }

  render(){

    const options = [{
      'key': 1,
      'text': 1,
      'value': 1,
      'content': 1
    },
    {
      'key': 2,
      'text': 2,
      'value': 2,
      'content': 2
    },
    {
      'key': 3,
      'text': 3,
      'value': 3,
      'content': 3
    },
    {
      'key': 4,
      'text': 4,
      'value': 4,
      'content': 4
    },
    {
      'key': 5,
      'text': 5,
      'value': 5,
      'content': 5
    }]

    return(

      <div className="sponsorReview">

        <Form className="sponsorReviewForm" onSubmit={this.handleSubmit}>
          <h3>{this.props.currentSponsor.username}'s Review</h3>
        <Form.Field className="dropDownReview">
  rating: <Dropdown inline header='Rating' options={options} defaultValue="rating" value={this.state.rating} onChange={this.handleDropChange}/>
        </Form.Field>
      <Form.TextArea className="reviewTextArea" placeholder="write a review" name="body" type="text" value={this.state.body} onChange={this.handleOnChange}>
        </Form.TextArea>
        <Button className="submitButton" type='submit'>Submit</Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentSponsor: state.sponsorsReducer.sponsor,
    currentSponsee: state.sponseesReducer.sponsee,
    sponsees: state.sponseesReducer.sponsees,
    sponsors: state.sponsorsReducer.sponsors,
    currentPosition: state.currentReducer.currentPosition
  }
}

export default connect(mapStateToProps)(SponsorReview)
