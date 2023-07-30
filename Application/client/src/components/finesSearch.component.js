import React, { Component } from "react";
import LibraryDataService from "../services/library.service";
import { Link } from "react-router-dom";

export default class SearchFines extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchValue = this.onChangeSearchValue.bind(this);
    this.retrieveFines = this.retrieveFines.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveFine = this.setActiveFine.bind(this);
    
    this.searchValue = this.searchValue.bind(this);

    this.state = {
      fines: [],
      currentFine: null,
      currentIndex: -1,
      searchValue: false
    };
  }
  
  componentDidMount() {
    this.retrieveFines();
  }

  onChangeSearchValue(e) {
    const searchValue = e.target.value;

    this.setState({
      searchValue: searchValue
    });
  }

  retrieveFines() {
    if(this.state.searchValue === false){
      LibraryDataService.getAllFines()
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
    else{
      LibraryDataService.getUnpaidFines()
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

  

  searchValue() {
    const searchValue = this.state.searchValue === false ? true : false

    this.setState({
      searchValue: searchValue
    });

    this.retrieveFines();

  }

  render() {
    const {  fines, currentFine, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            
            <div className="input-group-append">
              <button
                className="btn btn-dark"
                type="button"
                onClick={this.searchValue}
              >
                Show/Hide Paid Fines
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
        <h4>Fines List (Card_id, Bname,Fine_amt,Paid) </h4>


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
                  {fine.Card_id} <strong>||</strong> {fine.Bname} <strong>||</strong> {fine.Fine_amt} <strong>||</strong>
                   {fine.Paid === 0 ?'Unpaid' : 'Paid'}
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
                  <strong>Card Id:</strong>
                </label>{" "}
                {currentFine.Card_id}
              </div>
              <div>
                <label>
                  <strong>Borrower Name:</strong>
                </label>{" "}
                {currentFine.Bname}
              </div>
              <div>
                <label>
                  <strong>Fine Amount:</strong>
                </label>{" "}
                {currentFine.Fine_amt}
              </div>
              <div>
                <label>
                  <strong>Paid:</strong>
                </label>{" "}
                {currentFine.Paid === 0 ?'Unpaid' : 'Paid'}
              </div>
              {currentFine.Paid === 1 
              ? (<button
                className="btn btn-success"
                type="button"
                disabled={true}>
                Pay Fine
              </button>)
              
               : (<Link to={"/finesbycid/"+currentFine.Card_id} className="btn btn-success">
               Pay Fine
               </Link>)}
              
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Fine Record to update ...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}


