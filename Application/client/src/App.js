import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddBorrower from "./components/addBorrower.component";
import CheckOut from "./components/checkOut.component";
import SearchBooks from "./components/searchBooks.component";
import CheckInSearch from "./components/checkInSearch.component";
import CheckInLoan from "./components/checkInLoan.component";
import RefreshFines from "./components/refreshFines.component";
import FinesSearch from "./components/finesSearch.component";
import PayFines from "./components/payFines.component";
import FinesByCid from "./components/finesByCid.component";
class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/searchbooks"} className="navbar-brand">
            Library Management
          </Link>
          <div className="navbar-nav mr-auto">
          <li className="nav-item">
              <Link to={"/searchbooks"} className="nav-link">
                Search Books
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/checkinsearch"} className="nav-link">
                Check In
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/finessearch"} className="nav-link">
                Fines
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/refreshfines"} className="nav-link">
                Refresh Fines
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addborrower"} className="nav-link">
                Add Borrower
              </Link>
            </li>

            
          </div>
        </nav><div className="container mt-3">
          <Routes>
            <Route path="/finesbycid/:id" element={<FinesByCid />} />
            <Route path="/payfines/:lid/:cid" element={<PayFines />} />
            <Route path="/refreshfines" element={<RefreshFines />} />
            <Route path="/finessearch" element={<FinesSearch />} />
            <Route path="/checkout/:id" element={<CheckOut />} />
            <Route path="/checkin/:id" element={<CheckInLoan />} />
            <Route path="/searchbooks" element={<SearchBooks />} />
            <Route path="/addborrower" element={<AddBorrower />} />
            <Route path="/checkinsearch" element={<CheckInSearch />} />
    
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;

