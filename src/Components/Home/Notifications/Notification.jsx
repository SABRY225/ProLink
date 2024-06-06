import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotificationCard from './NotificationCard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Notification.css'; // Ensure this import is at the correct location for your CSS
import { useSelector } from 'react-redux';

export default function Notification() {
    const tok = useSelector((state) => state.auth.token);

  const [notifications, setNotifications] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5292/api/Notification/get-user-all',{
        headers: {
            'Authorization': 'Bearer ' + tok,
        }
      });
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <>
      {notifications.map(notification => (
        <NotificationCard key={notification.id} notification={notification} onDelete={handleDelete} />
      ))}
      <ToastContainer />
    </>
  );
}
