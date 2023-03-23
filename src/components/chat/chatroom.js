import io from "socket.io-client";

import { useEffect, useState } from "react";
const socket = io.connect("http://localhost:5000");

export const Chatroom = () => {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [display, setDisplay] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };
  const joinRoom = () => {
    if (room.length > 0) {
      //        setRoom(room) <--- dO NOT DO THIS.
      socket.emit("join_room", room);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      //      alert(data.message); this is the precursor, using alert.
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <>
      <input
        placeholder="Type Room # here"
        onChange={(event) => {
          setRoom(event.target.value);
          console.log("on line 33, room =====", room);
        }}
      />
      <button
        className="button"
        onClick={() => {
          joinRoom();
          setDisplay(room);
          console.log("Line 39, just clicked, so room ====", room);
        }}
      >
        JOIN ROOM #{room}
      </button>
      <br></br>
      <input
        placeholder="Message would go here"
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage} className="button">
        Send it.
      </button>
      <h3>CURRENTLY IN ROOM #{display}</h3>
      <h3>INCOMING MESSAGE: {messageReceived}</h3>
    </>
  );
};

export default Chatroom;
