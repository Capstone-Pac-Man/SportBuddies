import React, { useState, useCallback, useEffect } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import {
  fetchAllMessagesInConvo,
  allMessages,
  sendMessage,
} from "../../reducers/messageSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../reducers/userSlice";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

export default function OpenConversation(props) {
  const [text, setText] = useState("");
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);
  const dispatch = useDispatch();

  let convoId = props.id;
  const convo = useSelector(allMessages);
  const user = useSelector(selectUser);
  const id = user.id;
  const name = user.fullName;

  useEffect(() => {
    dispatch(fetchAllMessagesInConvo(convoId));
    socket.emit("join_room", convoId);
    console.log("SOCKET JOINEDDD, room:", convoId);
  }, []);

  console.log("convo messages", convo.messages);
  console.log("convo", convo);

  async function handleSubmit(e) {
    e.preventDefault();
    // const recipients = convo.recipients.map((r) => r.id);
    const room = convoId;
    await dispatch(sendMessage({ id, name, text, convoId }));
    socket.emit("send_message", { text, room });
    dispatch(fetchAllMessagesInConvo(convoId));
    setText("");
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      //      alert(data.message); this is the precursor, using alert.
      dispatch(fetchAllMessagesInConvo(convoId));
    });
  }, [socket]);

  if (!convo || !convo.messages) return "Loading";

  return (
    <div
      style={{
        height: "90%",
      }}
      className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {convo.messages.map((message) => {
            const lastMessage = convo.messages.length - 1 === message.id;

            const theSender = message.userId === id;

            return (
              <div
                ref={lastMessage ? setRef : null}
                key={message.id}
                className={`my-1 d-flex flex-column ${
                  theSender
                    ? "align-self-end align-items-end"
                    : "align-items-start"
                }`}>
                <div
                  className={`rounded px-2 py-1 ${
                    theSender ? "bg-primary text-white" : "border"
                  }`}>
                  {message.text}
                </div>
                <div
                  className={`text-muted small ${
                    theSender ? "text-right" : ""
                  }`}>
                  {theSender ? "You" : message.senderId}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            />
            <Button type="submit">Send</Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
