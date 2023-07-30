import React, { Component } from "react";
import LibraryDataService from "../services/library.service";
import { Link } from "react-router-dom";
import { withRouter } from '../common/with-router';

class FinesByCid extends Component {
  constructor(props) {
    super(props);
    this.retrieveFines = this.retrieveFines.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveFine = this.setActiveFine.bind(this);
 
    this.state = {
      fines: [],
      currentFine: null,
      currentIndex: -1,
    };
  }
  
  componentDidMount() {
    this.retrieveFines();
  }

 

  retrieveFines() {
    LibraryDataService.getFinesByCid(this.props.router.params.id)
      .then(response => {
        this.setState({
          fines: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
   this.retrieveFines();
    this.setState({
      currentFine: null,
      currentIndex: -1
    });
  }

  setActiveFine(fine, index) {
    this.setState({
      currentFine: fine,
      currentIndex: index
    });
  }


  render() {
    const { fines, currentFine, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Fines of Card ID : {this.props.router.params.id} (Name, Loan id, Isbn, Fine, Date_in) </h4>

          <ul className="list-group">
            {fines &&
              fines.map((fine, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveFine(fine, index)}
                  key={index}
                >
                  {fine.Bname} <strong>||</strong> {fine.Loan_id} <strong>||</strong> {fine.Isbn} 
                  <strong>||</strong> {fine.Fine_amt} 
                  <strong>||</strong> {fine.Date_in === null ?'Not Returned' : 'Returned'}
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          {currentFine ? (
            <div>
              <h4>Fine</h4>
              <div>
                <label>
                  <strong>Borrower Name:</strong>
                </label>{" "}
                {currentFine.Bname}
              </div>
              <div>
                <label>
                  <strong>Loan Id:</strong>
                </label>{" "}
                {currentFine.Loan_id}
              </div>
              <div>
                <label>
                  <strong>Isbn:</strong>
                </label>{" "}
                {currentFine.Isbn}
              </div>
              <div>
                <label>
                  <strong>Fine Amount:</strong>
                </label>{" "}
                {currentFine.Fine_amt}
              </div>
              <div>
                <label>
                  <strong>Return Status :</strong>
                </label>{" "}
                {currentFine.Date_in === null ?'Not returned' : 'Returned'}
              </div>
              {currentFine.Date_in === null
              ? (<button
                className="btn btn-success"
                type="button"
                disabled={true}>
                Book need to be returned first
              </button>)
              
               : (<Link to={"/payfines/"+currentFine.Loan_id+"/"+currentFine.Card_id} className="btn btn-success">
               Pay Fine
               </Link>)}
              
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Fine to Pay ...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}



export default withRouter(FinesByCid);

