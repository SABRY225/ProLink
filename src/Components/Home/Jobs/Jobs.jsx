import React, { useEffect, useState } from "react";
import axios from "axios";
import JobRequestCard from "./JobRequestCard";
import { useSelector } from "react-redux";

function Jobs() {
      const tok = useSelector((state) => state.auth.token);

  const [jobRequests, setJobRequests] = useState([]);

  useEffect(() => {
    const fetchJobRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5292/api/JobReques/Get-jobRequests", {
          headers: {
            'Authorization': 'Bearer ' + tok,
          }
        });
        setJobRequests(response.data);
      } catch (error) {
        console.error("Error fetching job requests:", error);
      }
    };
    console.log (fetchJobRequests)
    fetchJobRequests();
  }, []);

  return (
    <div>
      {jobRequests.map((request) => (
        <JobRequestCard key={request.id} jobRequest={request} />
      ))}
    </div>
  );
}

export default Jobs;
