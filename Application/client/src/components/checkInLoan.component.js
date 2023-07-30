import React, { Component } from "react";
import LibraryDataService from "../services/library.service";
import { withRouter } from '../common/with-router';
import { Link } from "react-router-dom";

class CheckInLoan extends Component {
  constructor(props) {
    super(props);

    this.saveCheckIn= this.saveCheckIn.bind(this);
    this.newCheckIn = this.newCheckIn.bind(this);

    this.state = {
      id:this.props.router.params.id,
      created: null,
      submitted: false
    };
  }
  
  saveCheckIn() {

    LibraryDataService.checkIn(this.state.id)
      .then(response => {
        this.setState({
          id: response.data.id,
          created: true,
          submitted: true
        });
        console.log(response.data);

      })
      .catch(e => {
       this.setState({created: false});
        console.log(e.response.data);
      });
  }

  newCheckIn() {
    this.setState({
        id: null,
        created: null,
        submitted: false
    });
  }
  render() {
    return (
      <div className="submit-form">
      {   this.state.submitted  ? (
            <div>
              <h4>Book Checked In Successfully! Loan id is {this.state.id}</h4>
              <Link to="/checkinsearch">
              <button className="btn btn-success" onClick={this.newLoan}>
                Search Loans to Check In
              </button>
              </Link>
              </div>
          ) 
          
          : (
            
            (this.state.created === false  && this.state.created !== null)?(
              <div>
              <h4>Loan Doesnot Exist!</h4>
              <Link to="/checkinsearch">
              <button className="btn btn-success" onClick={this.newLoan}>
                Search Loans to Check In
              </button>
              </Link>
              </div>
              ) :
                (
              <div>
                <button onClick={this.saveCheckIn} className="btn btn-success">
                  Check In Book
                </button>
              </div>
        )
        )
      }
      </div>
    );
  }
}
export default withRouter(CheckInLoan);
