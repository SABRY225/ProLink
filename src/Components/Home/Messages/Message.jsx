import React from 'react';
import './Message.css'; // Assuming you save the CSS styles in Chat.css

const Message = () => {
  return (
    <div className="container py-5 px-4">
      {/* For demo purpose */}
      <header className="text-center">
        <h1 className="display-4 text-white">Bootstrap Chat</h1>
        <p className="text-white lead mb-0">An elegant chat widget compatible with Bootstrap 4</p>
        <p className="text-white lead mb-4">Snippet by
          <a href="https://bootstrapious.com" className="text-white">
            <u>Bootstrapious</u></a>
        </p>
      </header>

      <div className="row rounded-lg overflow-hidden shadow">
        {/* Users box */}
        <div className="col-5 px-0">
          <div className="bg-white">
            <div className="bg-gray px-4 py-2 bg-light">
              <p className="h5 mb-0 py-1">Recent</p>
            </div>
            <div className="messages-box">
              <div className="list-group rounded-0">
                <User
                  active
                  name="Jason Doe"
                  date="25 Dec"
                  message="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."
                />
                <User
                  name="Jason Doe"
                  date="14 Dec"
                  message="Lorem ipsum dolor sit amet, consectetur. incididunt ut labore."
                />
                <User
                  name="Jason Doe"
                  date="9 Nov"
                  message="consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."
                />
                <User
                  name="Jason Doe"
                  date="18 Oct"
                  message="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."
                />
                <User
                  name="Jason Doe"
                  date="17 Oct"
                  message="consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."
                />
                <User
                  name="Jason Doe"
                  date="2 Sep"
                  message="Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                />
                <User
                  name="Jason Doe"
                  date="30 Aug"
                  message="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."
                />
                <User
                  name="Jason Doe"
                  date="21 Aug"
                  message="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Chat Box */}
        <div className="col-7 px-0">
          <div className="px-4 py-5 chat-box bg-white">
            {/* Sender Message */}
            <ChatMessage
              sender
              time="12:00 PM | Aug 13"
              message="Test which is a new approach all solutions"
            />
            {/* Receiver Message */}
            <ChatMessage
              time="12:00 PM | Aug 13"
              message="Test which is a new approach to have all solutions"
              primary
            />
            {/* Sender Message */}
            <ChatMessage
              sender
              time="12:00 PM | Aug 13"
              message="Test, which is a new approach to have"
            />
            {/* Receiver Message */}
            <ChatMessage
              time="12:00 PM | Aug 13"
              message="Apollo University, Delhi, India Test"
              primary
            />
            {/* Sender Message */}
            <ChatMessage
              sender
              time="12:00 PM | Aug 13"
              message="Test, which is a new approach"
            />
            {/* Receiver Message */}
            <ChatMessage
              time="12:00 PM | Aug 13"
              message="Apollo University, Delhi, India Test"
              primary
            />
          </div>

          {/* Typing area */}
          <form action="#" className="bg-light">
            <div className="input-group">
              <input
                type="text"
                placeholder="Type a message"
                aria-describedby="button-addon2"
                className="form-control rounded-0 border-0 py-4 bg-light"
              />
              <div className="input-group-append">
                <button id="button-addon2" type="submit" className="btn btn-link">
                  <i className="fa fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const User = ({ active, name, date, message }) => (
  <a
    className={`list-group-item list-group-item-action ${active ? 'active text-white' : 'list-group-item-light'} rounded-0`}
  >
    <div className="media">
      <img
        src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
        alt="user"
        width="50"
        className="rounded-circle"
      />
      <div className="media-body ml-4">
        <div className="d-flex align-items-center justify-content-between mb-1">
          <h6 className="mb-0">{name}</h6>
          <small className="small font-weight-bold">{date}</small>
        </div>
        <p className="font-italic mb-0 text-small">{message}</p>
      </div>
    </div>
  </a>
);

const ChatMessage = ({ sender, time, message, primary }) => (
  <div className={`media w-50 mb-3 ${sender ? '' : 'ml-auto'}`}>
    {!sender && (
      <img
        src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg"
        alt="user"
        width="50"
        className="rounded-circle"
      />
    )}
    <div className="media-body ml-3">
      <div className={`rounded py-2 px-3 mb-2 ${primary ? 'bg-primary' : 'bg-light'}`}>
        <p className={`text-small mb-0 ${primary ? 'text-white' : 'text-muted'}`}>{message}</p>
      </div>
      <p className="small text-muted">{time}</p>
    </div>
  </div>
);

export default Message;
