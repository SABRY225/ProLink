import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

function formatTimestamp(timestamp) {

  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now - past) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 60) {
    return ` ${diffInMinutes}m`;
  } else if (diffInHours < 24) {
    return ` ${diffInHours}h`;
  } else {
    return ` ${diffInDays}d`;
  }
}

function NotificationCard({ notification, onDelete }) {
    const tok = useSelector((state) => state.auth.token);
  const { id, timestamp, content, sender } = notification;
  console.log(notification);
  const formattedTimestamp = formatTimestamp(timestamp);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5292/api/Notification?notificationId=${id}`,{
        headers: {
            'Authorization': 'Bearer ' + tok,
        }
      });
      if (response.status === 200 || response.status === 204) {
        toast.success('Notification deleted successfully');
        onDelete(id);
      } else {
        toast.error('Failed to delete notification');
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      toast.error('Error deleting notification');
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <div className="toast-custom">
      <div className="toast-img-container">
        <img className="toast-image rounded-circle" src={sender.profilePicture} alt="User" />
      </div>
      <div className="toast-content toast-with-image">
        <span className="toast-title"><b>{sender.firstName} {sender.lastName}</b></span>
        <small className='notTime'>{formattedTimestamp}</small>
        <p className='notContent'>{content}</p>
      </div>
      <button className="delete-button" onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  );
}

export default NotificationCard;
