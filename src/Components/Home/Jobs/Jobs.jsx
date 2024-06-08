import React from "react";

function Jobs() {
  return (
    <div className="container row mt-3 h-100">
      <div className="requestFriend col h-100 d-flex flex-column">
        <h2 className="title">Jobs Requests</h2>
        <div className="requests overflow-scroll flex-grow-1">
          <div className="fan card text-decoration-none m-2">
            <div className="card-body">
              <h5 className="card-header">
                company name
              </h5>{" "}
              <p className="card-text">company info</p>
              <p className="card-text gap-2">
                <small className="text-muted">what is job</small>
              </p>
              <div className="control-button d-flex justify-content-around">
                <button type="button" href="#" className="btn btn-primary">
                  Accept
                </button>
                <button type="button" href="#" className="btn btn-primary">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
