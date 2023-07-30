import React, { Component } from "react";
import LibraryDataService from "../services/library.service";
import { withRouter } from '../common/with-router';
import { Link } from "react-router-dom";

class CheckOut extends Component {
  constructor(props) {
    super(props);

    this.onChangeCardId= this.onChangeCardId.bind(this);
  
    this.saveLoan= this.saveLoan.bind(this);
    this.newLoan = this.newLoan.bind(this);

    this.state = {
      id:null,
      Isbn: this.props.router.params.id,
      Card_id: "",
      created: null,
      submitted: false
    };
  }

  onChangeCardId(e) {
    this.setState({
      Card_id: e.target.value
    });
  }
  
  saveLoan() {
    var data = {
      Card_id: this.state.Card_id,
      Isbn: this.state.Isbn
    };

    LibraryDataService.createBookLoan(data)
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

  newLoan() {
    this.setState({
        Isbn: null,
        Card_id: "",
        created: null,
        submitted: false
    });
  }
  render() {
    return (
      <div className="submit-form">
      {   this.state.submitted  ? (
            <div>
              <h4>Book Checked Out Successfully! Loan id is {this.state.id}</h4>
              <Link to="/searchbooks">
              <button className="btn btn-success" onClick={this.newLoan}>
                Search Books
              </button>
              </Link>
              </div>
          ) 
          
       

          : (
            
            (this.state.created === false  && this.state.created !== null)?(
              <div>
              <h4>Borrower Already Checked Out 3 books!</h4>
              <Link to="/searchbooks">
              <button className="btn btn-success" onClick={this.newLoan}>
              Search Books
              </button>
              </Link>
              </div>
              ) :
                (
              
                

          <div>
            <div className="form-group">
              <label htmlFor="Card_id">Card Id</label>
              <input
                type="text"
                className="form-control"
                id="Card_id"
                required
                value={this.state.Card_id}
                onChange={this.onChangeCardId}
                name="Card_id"
              />
            </div>
            <button onClick={this.saveLoan} className="btn btn-success">
              Check Out Book
            </button>
          </div>
        )
        )
      }
      </div>
    );
  }
}

export default withRouter(CheckOut);
