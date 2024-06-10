import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import StatisticsCards from './StatisticsCards';
import StatisticsButtons from './StatisticsButtons';
import "./Explor.css";
import ExplorJob from './ExplorJob';
import NoResult from './NoResult';
import UserCard from './UserCard';

function Explor() {
  const tok = useSelector((state) => state.auth.token);

  const [statistics, setStatistics] = useState({ postsCount: 0, jobsCount: 0, userCounts: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeButton, setActiveButton] = useState('Users');

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [jobs, setJobs] = useState([]);
  
  const searchValue = useSelector((state) => state.search.searchVal);

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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!searchValue) return;
      try {
        const response = await axios.get(`http://localhost:5292/api/User/get-by-name?name=${searchValue}`, {
          headers: {
            'Authorization': 'Bearer ' + tok,
          },
        });
        setUsers(response.data || []);
      } catch (error) {
        setUsers([]); 
      }
    };

    const fetchPosts = async () => {
      if (!searchValue) return;
      try {
        const response = await axios.get(`http://localhost:5292/api/Post/get-By-Title?title=${searchValue}`, {
          headers: {
            'Authorization': 'Bearer ' + tok,
          },
        });
        setPosts(response.data || []);
      } catch (error) {
        setPosts([]);
      }
    };

    const fetchJobs = async () => {
      if (!searchValue) return;
      try {
        const response = await axios.get(`http://localhost:5292/api/Job/get-By-Title?title=${searchValue}`, {
          headers: {
            'Authorization': 'Bearer ' + tok,
          },
        });
        setJobs(response.data || []);
      } catch (error) {
        setJobs([]);
      }
    };

    switch (activeButton) {
      case 'Users':
        fetchUsers();
        break;
      case 'Posts':
        fetchPosts();
        break;
      case 'Jobs':
        fetchJobs();
        break;
      default:
        break;
    }
  }, [activeButton, searchValue, tok]);

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <>
      <StatisticsCards 
        users={statistics.userCounts} 
        posts={statistics.postsCount} 
        jobs={statistics.jobsCount} 
      />
      <StatisticsButtons onButtonClick={handleButtonClick} />
      <div className="results">

        {activeButton === 'Users' && users.length > 0 ? (
          users.map((user) => (
            <UserCard key={user.id} user={user}/>
          ))
        ) 
        : activeButton === 'Posts' && posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="result-item">
              {JSON.stringify(post)}
            </div>
          ))
        ) 
        : activeButton === 'Jobs' && jobs.length > 0 ? (
          jobs.map((job) => (
            <ExplorJob key={job.id} post={job}/>
          ))
        ) : (
          searchValue&& <NoResult/>
        )}
      </div>
    </>
  );
}

export default Explor;
