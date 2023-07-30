import React, { Component } from "react";
import LibraryDataService from "../services/library.service";
import { Link } from "react-router-dom";

export default class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchValue = this.onChangeSearchValue.bind(this);
    this.retrieveBooks = this.retrieveBooks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveBook = this.setActiveBook.bind(this);
    this.searchValue = this.searchValue.bind(this);

    this.state = {
      books: [],
      currentBook: null,
      currentIndex: -1,
      searchValue: ""
    };
  }
  
  componentDidMount() {
    this.retrieveBooks();
  }

  onChangeSearchValue(e) {
    const searchValue = e.target.value;

    this.setState({
      searchValue: searchValue
    });
  }

  retrieveBooks() {
   
  }
 

  refreshList() {
    this.setState({
      currentBook: null,
      currentIndex: -1
    });
  }

  setActiveBook(book, index) {
    this.setState({
      currentBook: book,
      currentIndex: index
    });
  }

  

  searchValue() {
    LibraryDataService.findBySearch(this.state.searchValue)
    .then(response => {
      this.setState({
        books: response.data
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }

  render() {
    const { searchValue, books, currentBook, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search Books"
              value={searchValue}
              onChange={this.onChangeSearchValue}
            />
            <div className="input-group-append">
              <button
                className="btn btn-dark"
                type="button"
                onClick={this.searchValue}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Books List (Isbn, Title,Authors,Availability) </h4>

          <ul className="list-group">
            {books &&
              books.map((book, index) => (
                
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveBook(book, index)}
                  key={index}
                >
                  {book.Isbn} <strong>||</strong> {book.Title} <strong>||</strong> {book.Authors} <strong>||</strong> {book.Availability === 0 ?'No' : 'Yes'}
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          {currentBook ? (
            <div>
              <h4>Book</h4>
              <div>
                <label>
                  <strong>Isbn:</strong>
                </label>{" "}
                {currentBook.Isbn}
              </div>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentBook.Title}
              </div>
              <div>
                <label>
                  <strong>Authors:</strong>
                </label>{" "}
                {currentBook.Authors}
              </div>
              <div>
                <label>
                  <strong>Availability:</strong>
                </label>{" "}
                {currentBook.Availability === 0 ?'No' : 'Yes'}
              </div>
              {currentBook.Availability === 0 
              ? (<button
                className="btn btn-success"
                type="button"
                disabled={true}>
                Book is not available for Check Out
              </button>)
              
               : (<Link to={"/checkout/"+currentBook.Isbn} className="btn btn-success">
               Check Out
               </Link>)}
              
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an Available Book to check out...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}


