import React, { Component } from "react";
import LibraryDataService from "../services/library.service";
import { withRouter } from '../common/with-router';
import { Link } from "react-router-dom";

class RefreshFines extends Component {
  constructor(props) {
    super(props);

    this.saveRefresh= this.saveRefresh.bind(this);
    this.newRefresh = this.newRefresh.bind(this);

    this.state = {
        created: null,
      submitted: false
    };
  }
  
  saveRefresh() {

    LibraryDataService.refreshFines()
      .then(response => {
        this.setState({
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

  newRefresh() {
    this.setState({
        created: null,
        submitted: false
    });
  }
  render() {
    return (
      <div className="submit-form">
      {   this.state.submitted  ? (
            <div>
              <h4>Fines Refreshed Successfully! </h4>
              <Link to="/finessearch">
              <button className="btn btn-success" onClick={this.newRefresh}>
                Fines Page
              </button>
              </Link>
              </div>
          ) 
          
          : (
            
            (this.state.created === false  && this.state.created !== null)?(
              <div>
              <h4>Refresh Failed!</h4>
              <Link to="/finessearch">
              <button className="btn btn-success" onClick={this.newRefresh}>
                Fines Page
              </button>
              </Link>
              </div>
              ) :
                (
              <div>
                <button onClick={this.saveRefresh} className="btn btn-success">
                  Refresh Fines
                </button>
              </div>
        )
        )
      }
      </div>
    );
  }
}
export default withRouter(RefreshFines);
