import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../reducers/userSlice";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Tab, Nav, Form, InputGroup, Button } from "react-bootstrap";
import {
  selectConversations,
  fetchAllUserConversations,
  fetchConversationMessages,
  updateSelectedConvo,
} from "../../reducers/conversationSlice";
import { ListGroup } from "react-bootstrap";
import OpenConversation from "./OpenConversation";
import io from "socket.io-client";
import { fetchAllMessagesInConvo } from "../../reducers/messageSlice";
import { fetchOneUserAsync } from "../../reducers/userSlice";
import Loading from "../../assets/Loading";
import socket from "../../socket";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

// const socket = io.connect("http://localhost:5000");

const CONVERSATIONS_KEY = "conversations";

export default function Sidebar() {
  const isAuth = localStorage.getItem("auth");
  const [selected, setSelected] = useState(null);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    if (isAuth) {
      dispatch(fetchOneUserAsync());
    } else {
      signOut(auth);
      navigate("/login");
    }
  }, [dispatch]);
  useEffect(() => {
    if (user.id) {
      socket.emit("makeRoom", { id: user.id });
    } else if (user.error) {
      navigate("/login");
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
    console.log(e.target.value);
    console.log("-->>", content);
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
        className="d-flex flex-column"
      >
        <Tab.Container
          activeKey={CONVERSATIONS_KEY}
          onSelect={CONVERSATIONS_KEY}
        >
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
                      active={parseInt(selected) === e.id}
                    >
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
          className="d-flex flex-column flex-grow-1"
        >
          <div className="flex-grow-1 overflow-auto">
            <div className="d-flex flex-column align-items-start justify-content-end px-3">
              {" "}
              {conversations.singleConversation.conversationMessages.map(
                (e) => {
                  const lastMessage =
                    conversations.singleConversation.length - 1 === e.id;

                  const theSender = e.senderId === user.id;

                  return (
                    // <div
                    //   style={
                    //     e.senderId === user.id
                    //       ? { backgroundColor: "blue" }
                    //       : null
                    //   }>
                    //   {e.content}
                    // </div>

                    <div
                      ref={lastMessage ? setRef : null}
                      key={e.id}
                      className={`my-1 d-flex flex-column ${
                        theSender
                          ? "align-self-end align-items-end"
                          : "align-items-start"
                      }`}
                    >
                      <div
                        className={`rounded px-2 py-1 ${
                          theSender ? "bg-primary text-white" : "border"
                        }`}
                      >
                        {e.content}
                      </div>
                      <div
                        className={`text-muted small ${
                          theSender ? "text-right" : ""
                        }`}
                      >
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
      {/* <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => handleSend(e)}></input> */}
    </div>
  );
}

//   return (
//     <div className="d-flex" style={{ height: "100vh" }}>
//       <div
//         style={{ width: "250px", height: "90%" }}
//         className="d-flex flex-column">
//         <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
//           <Nav variant="tabs" className="justify-content-center">
//             <Nav.Item>
//               <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
//             </Nav.Item>
//           </Nav>
//           <Tab.Content className="border overflow-auto flex-grow-1">
//             <Tab.Pane eventKey={CONVERSATIONS_KEY}>
//               <ListGroup variant="flush">
//                 {conversations.map((conversation) => (
//                   <ListGroup.Item
//                     key={conversation.id}
//                     action
//                     onClick={() => {
//                       setSelectedConversationIndex(conversation.id);
//                       dispatch(
//                         fetchAllMessagesInConvo(selectedConversationIndex)
//                       );
//                       socket.emit("join_room", selectedConversationIndex);
//                       console.log(
//                         "SOCKET JOINEDDD, room:",
//                         selectedConversationIndex
//                       );
//                     }}
//                     active={conversation.id === selectedConversationIndex}>
//                     {conversation.userConversations[0].recipients
//                       .map((r) => r.name)
//                       .join(", ")}
//                   </ListGroup.Item>
//                 ))}
//               </ListGroup>
//             </Tab.Pane>
//           </Tab.Content>
//         </Tab.Container>
//       </div>
//       {selectedConversationIndex && (
//         <OpenConversation id={selectedConversationIndex} />
//       )}
//     </div>
//   );
// }
