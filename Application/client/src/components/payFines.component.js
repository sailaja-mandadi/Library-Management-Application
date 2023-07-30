import React, { Component } from "react";
import LibraryDataService from "../services/library.service";
import { withRouter } from '../common/with-router';
import { Link } from "react-router-dom";

class PayFines extends Component {
  constructor(props) {
    super(props);

    this.savePayment= this.savePayment.bind(this);
    this.newPayment = this.newPayment.bind(this);

    this.state = {
      lid:this.props.router.params.lid,
      cid:this.props.router.params.cid,
      created: null,
      submitted: false
    };
  }
  
  savePayment() {

    LibraryDataService.payFinesByLid(this.state.lid)
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

  newPayment() {
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
              <h4>Payment Updated Successfully! Loan id is {this.state.id}</h4>
              <Link to={"/finesbycid/" + this.state.cid}>
              <button className="btn btn-success" onClick={this.newPayment}>
                Back
              </button>
              </Link>
              </div>
          ) 
          : (
            
            (this.state.created === false  && this.state.created !== null)?(
              <div>
              <h4>Loan Doesnot Exist!</h4>
              <Link to={"/finesbycid/" + this.state.cid}>
              <button className="btn btn-success" onClick={this.newLoan}>
                Back
              </button>
              </Link>
              </div>
              ) :
                (
              <div>
                <button onClick={this.savePayment} className="btn btn-success">
                  Pay Fine
                </button>
              </div>
        )
        )
      }
      </div>
    );
  }
}
export default withRouter(PayFines);

