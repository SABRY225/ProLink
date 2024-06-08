import "./Style.css";
import React, { useCallback, useEffect, useState } from "react";
import PersonImage from "../../../assets/peopleImage.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Friends() {
  const [requestFriend, setRequestFriend] = useState([]);
  const [friends, setFriends] = useState([]);
  const tok = useSelector((state) => state.auth.token);

  const getRequestFriend = useCallback(async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + "/FriendRequest/Get-friendRequests",
        {
          headers: {
            Authorization: "Bearer " + tok,
            "Content-Type": "application/json",
          },
        }
      );
      setRequestFriend([...data]);
    } catch (err) {
      console.error(err);
    }
  }, [tok]);

  const getFriends = useCallback(async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + "/Friend/get",
        {
          headers: {
            Authorization: "Bearer " + tok,
            "Content-Type": "application/json",
          },
        }
      );
      setFriends([...data]);
    } catch (e) {
      console.error(e);
    }
  }, [tok]);

  useEffect(() => {
    getRequestFriend();
    getFriends();
  }, [tok]);

  const removeFriend = async ({ id }) => {
    console.log(id);
    try {
      const { data } = await axios.put(
        process.env.REACT_APP_API_URL + "/Friend/delete?friendId=" + id,
        {
          headers: {
            Authorization: "Bearer " + tok,
            "Content-Type": "application/json",
          },
        }
      );
      getFriends();
      // console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  const confirm = async ({ id }) => {
    console.log(id);
    try {
      const { data } = await axios.put(
        process.env.REACT_APP_API_URL +
          "/FriendRequest/accept-friendRequest?friendRequestId=" +
          id,
        {
          headers: {
            Authorization: "Bearer " + tok,
            "Content-Type": "application/json",
          },
        }
      );
      getRequestFriend();
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };
  const Cancel = async ({ id }) => {
    console.log(id);
    try {
      const { data } = await axios.put(
        process.env.REACT_APP_API_URL +
          "/FriendRequest/delete-friendRequest?friendId=" +
          id,
        {
          headers: {
            Authorization: "Bearer " + tok,
            "Content-Type": "application/json",
          },
        }
      );
      getRequestFriend();
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container row mt-3 h-100">
      <div
        className="requestFriend col h-100 d-flex flex-column"
        style={{ borderRight: "2px solid #ddd" }}
      >
        <h2 className="title">Requests</h2>
        <div className="requests overflow-scroll flex-grow-1">
          {requestFriend.map((request) => {
            const user = request.sender;
            return (
              <div
                key={request.id}
                className="card request text-decoration-none m-2"
              >
                <h5 className="card-header">
                  {user.firstName + " " + user.lastName}
                </h5>
                <div className="card-body">
                  <p className="card-text">{user.jopTitle}</p>
                  <div className="control-button d-flex justify-content-around">
                    <button
                      onClick={() => confirm({ id: request.id })}
                      type="button"
                      href="#"
                      className="btn btn-primary"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => Cancel({ id: request.id })}
                      type="button"
                      href="#"
                      className="btn btn-primary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="friends col h-100 d-flex flex-column">
        <h2 className="title">Friends</h2>
        <div className="fans  overflow-scroll flex-grow-1">
          {friends.map((friend) => {
            const name = friend.firstName + " " + friend.lastName;
            return (
              <div
                key={friend.id}
                className="fan card text-decoration-none m-2"
              >
                <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  <p className="card-text">
                    {friend.jopTitle}/{friend.description}
                  </p>
                  <p className="card-text gap-2">
                    <small className="text-muted">
                      Followers {friend.followersCount}
                    </small>
                    <button
                      onClick={() => removeFriend({ id: friend.id })}
                      type="button"
                      href="#"
                      className="btn"
                    >
                      Remove
                    </button>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
