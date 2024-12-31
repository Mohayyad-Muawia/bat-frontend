import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import InfoBar from "./InfoBar";
import InputBox from "./InputBox";
import MsgsBox from "./MsgsBox";
import RoomInfo from "./RoomInfo";
import ErrorPopup from "./ErrorPopup";

let socket;

const Chat = () => {
  const API = "http://localhost:4000";
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const location = useLocation();
  useEffect(() => {
    const { name, room, color } = queryString.parse(location.search);

    socket = io(API);

    setName(name);
    setRoom(room);
    setColor(color);

    socket.emit("join", { name, room, color }, (err) => {
      if (err) {
        setError(err);
      }
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [API, location.search]);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("message"); // Cleanup listener to prevent duplication.
    };
  }, []);

  useEffect(() => {
    socket.on("roomInfo", (info) => {
      setUsers(info.users);
    });

    return () => {
      socket.off("roomInfo");
    };
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("send", message, () => setMessage(""));
    }
  };

  useEffect(() => {
    socket.on("roomInfo", (info) => {
      setUsers(info.users);
    });

    return () => {
      socket.off("roomInfo");
    };
  }, []);

  return (
    <div className="container">
      <RoomInfo users={users} name={name} room={room} />
      <div className="chat">
        <InfoBar room={room} users={users} />
        <MsgsBox messages={messages} name={name} />
        <InputBox
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <ErrorPopup message={error} onClose={() => setError("")} />{" "}
    </div>
  );
};

export default Chat;
