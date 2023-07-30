import React, { Component } from "react";
import LibraryDataService from "../services/library.service";
import { Link } from "react-router-dom";

export default class CheckInSearch extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchValue = this.onChangeSearchValue.bind(this);
    this.retrieveLoans = this.retrieveLoans.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveLoan = this.setActiveLoan.bind(this);
    //this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchValue = this.searchValue.bind(this);

    this.state = {
      loans: [],
      currentLoan: null,
      currentIndex: -1,
      searchValue: ""
    };
  }
  
  componentDidMount() {
    this.retrieveLoans();
  }

  onChangeSearchValue(e) {
    const searchValue = e.target.value;

    this.setState({
      searchValue: searchValue
    });
  }

  retrieveLoans() {
   
  }
  

  refreshList() {
   // this.retrieveBooks();
    this.setState({
      currentLoan: null,
      currentIndex: -1
    });
  }

  setActiveLoan(loan, index) {
    this.setState({
      currentLoan: loan,
      currentIndex: index
    });
  }

  

  searchValue() {
    LibraryDataService.findLoanBySearch(this.state.searchValue)
    .then(response => {
      this.setState({
        loans: response.data
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }

  render() {
    const { searchValue, loans, currentLoan, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search Loans by Book Id/Card Id/Borrower Name"
              value={searchValue}
              onChange={this.onChangeSearchValue}
            />
            <div className="input-group-append">
              <button
                className="btn btn-dark"
                type="button"
                onClick={this.searchValue}
              >
                Search Loan
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Loans (Loan Id, Card Id,Borrower Name , Isbn, Date out, Date Due, Date In) </h4>

          <ul className="list-group">
            {loans &&
              loans.map((loan, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveLoan(loan, index)}
                  key={index}
                >
                  {loan.Loan_id} <strong>||</strong> {loan.Card_id} <strong>||</strong> {loan.bname} <strong>||</strong> 
                  {loan.Isbn} <strong>||</strong> 
                   {(new Date(loan.Date_out)).toDateString()} <strong>||</strong> {(new Date(loan.Date_due)).toDateString()} 
                   <strong>||</strong> { loan.Date_in === null ? 'Not returned': (new Date(loan.Date_in)).toDateString()} 
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          {currentLoan ? (
            <div>
              <h4>Loan</h4>
              <div>
                <label>
                  <strong>Loan Id:</strong>
                </label>{" "}
                {currentLoan.Loan_id}
              </div>
              <div>
                <label>
                  <strong>Card Id:</strong>
                </label>{" "}
                {currentLoan.Card_id}
              </div>
              <div>
                <label>
                  <strong>Borrower Name:</strong>
                </label>{" "}
                {currentLoan.bname}
              </div>
              <div>
                <label>
                  <strong>Isbn:</strong>
                </label>{" "}
                {currentLoan.Isbn}
              </div>
              <div>
                <label>
                  <strong>Date Out:</strong>
                </label>{" "}
                {(new Date(currentLoan.Date_out)).toDateString()}
              </div>
              <div>
                <label>
                  <strong>Date Due:</strong>
                </label>{" "}
                {(new Date(currentLoan.Date_due)).toDateString()}
              </div>
              <div>
                <label>
                  <strong>Date In:</strong>
                </label>{" "}
                {currentLoan.Date_in === null ? 'Not returned': (new Date(currentLoan.Date_in)).toDateString()}
              </div>

              {currentLoan.Date_in !== null 
              ? (<button
                className="btn btn-success"
                type="button"
                disabled={true}>
                Check In
              </button>)
              
               : (<Link to={"/checkin/"+currentLoan.Loan_id} className="btn btn-success">
               Check In
               </Link>)}
              
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Loan to check in...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}


