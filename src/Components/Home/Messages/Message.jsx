import React, { useCallback, useEffect, useState } from 'react';
import './Message.css'; // Assuming you save the CSS styles in Chat.css
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Message = () => {
  const tok = useSelector((state) => state.auth.token);
  const[friends, setFriends] = useState([]);
  const [sender,setSender] = useState();
  const [message, setMessage] = useState([]);
  const [currentUser,setCurrentUser] = useState();
  const getFriends = useCallback( async () =>{
    try{
      const {data} = await axios.get(process.env.REACT_APP_URL + `/Friend/get`,{
        headers: {
            'Authorization': 'Bearer ' + tok,
        }
      });
      // console.log(data);
      setFriends([...data]);
    }catch(error){
      console.error(error.message); 
    }
  },[tok]);

  const getMessages = useCallback(async () =>{
    try{
      const {data} = await axios.get(process.env.REACT_APP_URL + `/Message/get?recieverId=` + sender ,{
        headers: {
          'Authorization': 'Bearer ' + tok,
        }
      });
      setMessage(data);
      // console.log(data);
    }catch(error){
      console.error(error.message);
    }
  },[tok,sender]);

  const getCurrentUser = useCallback( async() =>{
    try{
      const {data} = await axios.get(process.env.REACT_APP_URL + '/User/get-Current-user',{
        headers: {
            'Authorization': 'Bearer ' + tok,
        }
      });
      setCurrentUser(data);
      console.log(data);
    }catch(error){
      console.error(error.message);
    }
  },[tok]);

  useEffect(() => {
    getFriends();
    getMessages();
    message.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    getCurrentUser();
  },[tok,sender]);
  
  const sendMessage = async (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());
    
    console.log(formData, sender);
    
    try {
        const response = await axios.post(process.env.REACT_APP_URL + "/Message/send?recieverId=" + sender, 
          JSON.stringify(formData), {
            headers: {
                'Authorization': 'Bearer ' + tok,
                'Content-Type': 'application/json' // Specify content type as JSON
            }
        });
        getMessages();
        // console.log(response);
    } catch (error) {
        console.error(error.message);
    }
    
    event.target.reset();
  }

  console.log(message);
console.log(currentUser);
  return (
    <div className="container py-5 px-4 h-100">
      <div className="row rounded-lg overflow-hidden shadow h-100">
        {/* Users box */}
        <div className="col-4 px-0 overflow-scroll">
          <div className="bg-white">
            <div className="bg-gray px-4 py-2 bg-light">
              <p className="h5 mb-0 py-1">Recent</p>
            </div>
            <div className="messages-box">
              <div className="list-group rounded-0">
                {friends.map((friend) => {
                  // console.log(friend);
                  return (
                        <div
                            className={`list-group-item list-group-item-action rounded-0`}
                            onClick={() => setSender(friend.id)}
                            style={{backgroundColor: (friend.id === sender) ? "#3271ff":"",
                              color: (friend.id === sender) ? "#fff":""
                            }}
                          >
                          <User key={friend.id} name={`${friend.firstName} ${friend.lastName}`}/>
                        </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Box */}
        <div className="col-8 px-0  overflow-scroll">
          <div className="px-4 py-5 chat-box bg-white d-flex flex-column-reverse">
            {sender && message.map((m) => (
              <ChatMessage
                key={m.id}
                sender={currentUser.id === m.senderId}
                primary={currentUser.id === m.receiverId}
                time={m.timestamp}
                message={m.content}
              />))}
            {!sender && <div>No Chat</div>}
          </div>

          {/* Typing area */}
          <form onSubmit={sendMessage} className="bg-light">
            <div className="input-group">
              <input
                type="text"
                placeholder="Type a message"
                aria-describedby="button-addon2"
                className="form-control rounded-0 border-0 py-4 bg-light"
                name='Content'
              />
              <div className="input-group-append">
                <button
                  id="button-addon2"
                  type="submit"
                  className="btn btn-link"
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const User = ({ name, message }) => (
    <div className="media">
      <img
        src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
        alt="user"
        width="50"
        className="rounded-circle"
      />
      <div className="media-body ml-4">
        <div className="d-flex align-items-center justify-content-between mb-1">
          <h6 className="mt-1 m-auto">{name}</h6>
          {/* <small className="small font-weight-bold">{date}</small> */}
        </div>
        <p className="font-italic mb-0 text-small text-center">{message}</p>
      </div>
    </div>
);

const ChatMessage = ({ sender, time, message, primary }) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed, so add 1 and pad with zero
  const day = date.getDate().toString().padStart(2, '0'); // Pad day with zero if necessary
  const formattedDate = `${year}/${month}/${day}`;
  
  return <div
    className={`media w-50 mb-3 ${sender ? "" : "ml-auto"} ${
      primary ? "ms-auto" : ""
    }`}
  >
    {!sender && (
      <img
        src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
        alt="user"
        width="50"
        className="rounded-circle"
      />
    )}
    <div className="media-body ml-3">
      <div
        className={`rounded py-2 px-3 mb-2 ${
          primary ? "bg-primary" : ""
        }`}
        style={{backgroundColor: (!primary ? "#f3f3f3":"")}}
      >
        <p
          className={`text-small mb-0 ${primary ? "text-white" : "text-muted"}`}
        >
          {message}
        </p>
      </div>
      <p className="small text-muted" style={{fontSize:"12px"}}>{formattedDate}</p>
    </div>
  </div>
};

export default Message;
