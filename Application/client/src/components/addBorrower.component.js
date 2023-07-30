import React, { Component } from "react";
import LibraryDataService from "../services/library.service";

export default class AddBorrower extends Component {
  
  constructor(props) {
    super(props);

    this.onChangeFname = this.onChangeFname.bind(this);
    this.onChangeLname = this.onChangeLname.bind(this);
    this.onChangeSsn = this.onChangeSsn.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);

    
    this.saveBorrower= this.saveBorrower.bind(this);
    this.newBorrower = this.newBorrower.bind(this);

    this.state = {
      id: null,
      fname: "",
      lname: "",
      ssn: "",
      address: "",
      city: "",
      state: "",
      phone: "",
      created: null,
      submitted: false
    };
  }

  onChangeFname(e) {
    this.setState({
      fname: e.target.value
    });
  }
  onChangeLname(e) {
    this.setState({
      lname: e.target.value
    });
  }
  onChangeSsn(e) {
    this.setState({
      ssn: e.target.value
    });
  }
  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }
  onChangeCity(e) {
    this.setState({
      city: e.target.value
    });
  }
  onChangeState(e) {
    this.setState({
      state: e.target.value
    });
  }
  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }


  saveBorrower() {
    var data = {
      fname: this.state.fname,
      lname: this.state.lname,
      ssn: this.state.ssn,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      phone: this.state.phone
    };

    LibraryDataService.createBorrower(data)
      .then(response => {
        this.setState({
          id: response.data.Card_id,
          //fname: response.data.bname,
          //ssn: response.data.ssn,
          //address: response.data.address,
          //phone: response.data.phone,
         created: true,
          submitted: true
        });
        console.log(response.data);

      })
      .catch(e => {
       this.setState({created: false});
        console.log(e);
      });
  }

  newBorrower() {
    this.setState({
      id: null,
      fname: "",
      lname: "",
      ssn: "",
      address: "",
      city: "",
      state: "",
      phone: "",
      created: null,
      submitted: false
    });
  }
  render() {
    return (
      <div className="submit-form">
      {   this.state.submitted  ? (
            <div>
              <h4>Borrower Created successfully! Borrower id is {this.state.id}</h4>
              <button className="btn btn-success" onClick={this.newBorrower}>
                Add
              </button>
              </div>
          ) 
              
          : (
            
            (this.state.created === false  && this.state.created !== null)?(
              <div>
              <h4>Borrower Already Exists! Or Enter All Details!!</h4>
              <button className="btn btn-success" onClick={this.newBorrower}>
                Add
              </button>
              </div>
              ) :
                (
              
                

          <div>
            <div className="form-group">
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                className="form-control"
                id="fname"
                required
                value={this.state.fname}
                onChange={this.onChangeFname}
                name="fname"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lname">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lname"
                required
                value={this.state.lname}
                onChange={this.onChangeLname}
                name="lname"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ssn">Ssn</label>
              <input
                type="text"
                className="form-control"
                id="ssn"
                required
                value={this.state.ssn}
                onChange={this.onChangeSsn}
                name="ssn"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                required
                value={this.state.address}
                onChange={this.onChangeAddress}
                name="address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                required
                value={this.state.city}
                onChange={this.onChangeCity}
                name="city"
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                className="form-control"
                id="state"
                required
                value={this.state.state}
                onChange={this.onChangeState}
                name="state"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                value={this.state.phone}
                onChange={this.onChangePhone}
                name="phone"
              />
            </div>

            <button onClick={this.saveBorrower} className="btn btn-success">
              Create Borrower
            </button>
          </div>
        )
        )
      }
      </div>
    );
  }
}
