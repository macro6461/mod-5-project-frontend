import React, { Component } from 'react'
import { Form, Button, Dropdown, Icon } from 'semantic-ui-react'
import { addSponsorReview } from '../../actions/reviewActions'
import { getCurrentSponsor, removeCurrentSponsor } from '../../actions/sponsorActions'

import { connect } from 'react-redux'

class SponsorReview extends Component {

  state = {

    rating: 1,
    body: "",
    facility_id: ""
  }

  componentDidMount = () => {
    debugger
    const username = localStorage.getItem("username")
    this.props.getCurrentSponsor(username)
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,

    })
  }


  handleDropChange = (event) => {
    this.setState({
      rating: parseInt(event.target.innerText)
    })
  }

  handleSubmit = (event) => {
    debugger
    event.preventDefault()
    const sponsorReview = {sponsor_id: this.props.currentSponsor.id, rating: this.state.rating, body: this.state.body, facility_id: this.props.facilityId}
    this.props.addSponsorReview(sponsorReview)
    this.props.reviewClicked()
    this.props.showReviews()
    this.props.submittedModal()

  }

  changeStarColor = (event) => {

    let element = document.getElementById(event.target.id)
    //this gets the id of the star that is hovered over
    let starId = parseInt(element.id) //bc element.id is a string
    let strId = ""; //string id
    let i = 1 // star i at 1 since array indexes start at 0, we want to find all indexes that are lower than the hovered element's id. if we started at 0 index and the star we selected had an id of 2, that would result in three theoretical stars being highlighted (0, 1, 2) which is incorrect
    while (i <= starId) { //captures all stars to the left of the highlighted one
      strId = i.toString() //convert i back to string so we can get element by id again. The id's are strings.
      let gold = document.getElementById(strId) //get the element by the tstring id
      gold.style.color = "gold" //then change the style.color parameter from white to gold.
      i++; //do this to all indexes including the selected index
    }
    while (i <= 5) { //captures all stars to the right of the highlighted one. perform the same operations but change the color to white
      strId = i.toString()
      let white = document.getElementById(strId)
      white.style.color = "white"
      i++; //5 is the total number of stars, i.e. the max index
    }
    this.countYellowStars() //will ultimately store all the gold stars in an array then count the number of elements in the array
  }

  countYellowStars = () => {
    debugger
    let arr = []
    let stars = document.getElementsByClassName("star")
    for (let i = 0; i < stars.length; i++){ // needed to use a for loop because map, filter, etc. wouldn't work on an array of elements (my guess as to why it didn't work is that elements are not technically a datatype such as a string, integer, object, etc. that are usually elements that can be manipulated by more efficient array looping functions)
      if (stars[i].style.color === "gold"){
        //if the element in the stars array has a color that is gold, then push into the empty array.
        arr.push(stars[i].style.color)
      }
    }
    this.setState({
      rating: arr.length
    })
    //finally, set state.rating to the length of the arr. If the array contains three gold stars, this translates to a numerical value of three.
    //state.rating will be used as the rating parameter for my sponseeReview object, which will be the payload in my ADD_SPONSEE_REVIEW redux action  :)
  }

  render(){

    return(

      <div className="sponsorReview">

        <Form className="sponsorReviewForm" onSubmit={this.handleSubmit}>
          <Icon className="close" size="large" style={{color: 'red', marginLeft: '95%'}}onClick={this.props.reviewClicked}/>
        <h3>{localStorage.getItem("username")}'s Review</h3>
        <div>
        rating: <span className="star" id="1" style={{width: "4px", color: "gold", margin: "2px",  textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}} onMouseEnter={this.changeStarColor}>&#9733;</span>
      <span className="star" id="2" style={{width: "4px", color: "white", margin: "2px",  textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}} onMouseEnter={this.changeStarColor}>&#9733;</span><span className="star" id="3" style={{width: "4px", color: "white", margin: "2px",  textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}} onMouseEnter={this.changeStarColor}>&#9733;</span><span className="star" id="4" style={{width: "4px", color: "white", margin: "2px",  textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}} onMouseEnter={this.changeStarColor}>&#9733;</span><span className="star" id="5" style={{width: "4px", color: "white", margin: "2px",  textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}} onMouseEnter={this.changeStarColor}>&#9733;</span>
      </div>

      <Form.TextArea className="reviewTextArea" placeholder="write a review" name="body" type="text" value={this.state.body} onChange={this.handleOnChange} maxLength="200" required>
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

export default connect(mapStateToProps, {addSponsorReview, getCurrentSponsor, removeCurrentSponsor})(SponsorReview)
