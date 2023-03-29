import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../reducers/userSlice";
import React, { useState, useEffect } from "react";
import { Tab, Nav } from "react-bootstrap";
import {
  selectConversations,
  fetchAllUserConversations,
} from "../../reducers/conversationSlice";
import { ListGroup } from "react-bootstrap";
import OpenConversation from "./OpenConversation";
import io from "socket.io-client";
import { fetchAllMessagesInConvo } from "../../reducers/messageSlice";
const socket = io.connect("http://localhost:5000");

const CONVERSATIONS_KEY = "conversations";

export default function Sidebar() {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  const [selectedConversationIndex, setSelectedConversationIndex] =
    useState(null);
  const dispatch = useDispatch();
  const conversations = useSelector(selectConversations);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchAllUserConversations(user.id));
  }, [user]);

  useEffect(() => {
    dispatch(fetchAllMessagesInConvo(selectedConversationIndex));
    socket.emit("join_room", selectedConversationIndex);
    console.log("SOCKET JOINEDDD, room:", selectedConversationIndex);
  }, [selectedConversationIndex]);

  if (!conversations) return "No Conversations";

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <div
        style={{ width: "250px", height: "90%" }}
        className="d-flex flex-column">
        <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
          <Nav variant="tabs" className="justify-content-center">
            <Nav.Item>
              <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content className="border overflow-auto flex-grow-1">
            <Tab.Pane eventKey={CONVERSATIONS_KEY}>
              <ListGroup variant="flush">
                {conversations.map((conversation) => (
                  <ListGroup.Item
                    key={conversation.id}
                    action
                    onClick={() => {
                      setSelectedConversationIndex(conversation.id);
                      dispatch(
                        fetchAllMessagesInConvo(selectedConversationIndex)
                      );
                      socket.emit("join_room", selectedConversationIndex);
                      console.log(
                        "SOCKET JOINEDDD, room:",
                        selectedConversationIndex
                      );
                    }}
                    active={conversation.id === selectedConversationIndex}>
                    {conversation.userConversations[0].recipients
                      .map((r) => r.name)
                      .join(", ")}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
      {selectedConversationIndex && (
        <OpenConversation id={selectedConversationIndex} />
      )}
    </div>
  );
}
