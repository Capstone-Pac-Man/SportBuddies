import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Tab, Nav, Form, InputGroup, Button } from "react-bootstrap";
import {
  fetchAllUserConversations,
  fetchConversationMessages,
  updateSelectedConvo,
} from "../../reducers/conversationSlice";
import { ListGroup } from "react-bootstrap";
import { fetchOneUserAsync } from "../../reducers/userSlice";
import Loading from "../../assets/Loading";
import socket from "../../socket";

const CONVERSATIONS_KEY = "conversations";

export default function Sidebar() {
  const [selected, setSelected] = useState(null);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const conversations = useSelector((state) => state.conversations);
  const selectedConversationIdRef = useRef(null);
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);
  useEffect(() => {
    dispatch(fetchOneUserAsync());
    dispatch(fetchAllUserConversations());
    if (conversations.singleConversation) {
      setSelected(conversations.singleConversation.id);
    }
  }, [dispatch]);
  useEffect(() => {
    if (user.id) {
      socket.emit("makeRoom", { id: user.id });
    }
  }, [user]);

  useEffect(() => {
    selectedConversationIdRef.current = selected;
  }, [selected]);

  useEffect(() => {
    socket.on("newMessage", (data) => {
      if (selectedConversationIdRef.current) {
        dispatch(
          fetchConversationMessages(parseInt(selectedConversationIdRef.current))
        );
      }
      dispatch(fetchAllUserConversations());
    });
  }, [socket]);

  if (
    conversations.status === "loading" &&
    conversations.userConversations.length === 0
  ) {
    return <Loading />;
  }
  if (
    !conversations.userConversations ||
    conversations.userConversations.length === 0
  )
    return <h1 className="text-center">No user conversations</h1>;

  const handleSelect = async (e) => {
    await dispatch(fetchConversationMessages(parseInt(e.target.id)));
    setSelected(e.target.id);
  };
  const handleSend = (e) => {
    if (selected && e.key === "Enter") {
      e.preventDefault();
      const obj = {
        id: selected,
        content: e.target.value,
        otherId: conversations.singleConversation.users[0].id,
      };
      dispatch(updateSelectedConvo(obj));
      setContent("");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const obj = {
      id: selected,
      content: content,
    };
    dispatch(updateSelectedConvo(obj));
    setContent("");
  }

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <div
        style={{ width: "250px", height: "90%" }}
        className="d-flex flex-column">
        <Tab.Container
          activeKey={CONVERSATIONS_KEY}
          onSelect={CONVERSATIONS_KEY}>
          <Nav variant="tabs" className="justify-content-center">
            <Nav.Item>
              <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content className="border overflow-auto flex-grow-1">
            <Tab.Pane eventKey={CONVERSATIONS_KEY}>
              <ListGroup variant="flush">
                {conversations.userConversations.map((e) => {
                  return (
                    <ListGroup.Item
                      onClick={(e) => handleSelect(e)}
                      action
                      key={e.id}
                      id={e.id}
                      active={parseInt(selected) === e.id}>
                      {e.users[0].firstName} {e.users[0].lastName} {e.id}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>

      {selected ? (
        <div
          style={{
            height: "90%",
          }}
          className="d-flex flex-column flex-grow-1">
          <div className="flex-grow-1 overflow-auto">
            <div className="d-flex flex-column align-items-start justify-content-end px-3">
              {" "}
              {conversations.singleConversation.conversationMessages.map(
                (e) => {
                  const lastMessage =
                    conversations.singleConversation.length - 1 === e.id;

                  const theSender = e.senderId === user.id;

                  return (
                    <div
                      ref={lastMessage ? setRef : null}
                      key={e.id}
                      className={`my-1 d-flex flex-column ${
                        theSender
                          ? "align-self-end align-items-end"
                          : "align-items-start"
                      }`}>
                      <div
                        className={`rounded px-2 py-1 ${
                          theSender ? "bg-primary text-white" : "border"
                        }`}>
                        {e.content}
                      </div>
                      <div
                        className={`text-muted small ${
                          theSender ? "text-right" : ""
                        }`}>
                        {theSender ? "You" : e.senderId}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="m-2">
              <InputGroup>
                <Form.Control
                  as="textarea"
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onKeyDown={(e) => handleSend(e)}
                  style={{ height: "75px", resize: "none" }}
                />
                <Button type="submit">Send</Button>
              </InputGroup>
            </Form.Group>
          </Form>
        </div>
      ) : null}
    </div>
  );
}
