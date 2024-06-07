import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StatisticsCards from './StatisticsCards';

function Explor() {
  const [statistics, setStatistics] = useState({ postsCount: 0, jobsCount: 0, userCounts: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5292/api/Statistics');
        setStatistics(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <StatisticsCards 
      users={statistics.userCounts} 
      posts={statistics.postsCount} 
      jobs={statistics.jobsCount} 
    />
  );
}

export default Explor;
