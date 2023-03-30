import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../reducers/userSlice";
import React, { useState, useEffect, useRef } from "react";
import { Tab, Nav } from "react-bootstrap";
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
// const socket = io.connect("http://localhost:5000");

// const CONVERSATIONS_KEY = "conversations";

export default function Sidebar() {
  const [selected, setSelected] = useState(null);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const conversations = useSelector((state) => state.conversations);
  const selectedConversationIdRef = useRef(null);
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
  return (
    <div>
      {conversations.userConversations.map((e) => {
        return (
          <div
            onClick={(e) => handleSelect(e)}
            className={parseInt(selected) === e.id ? "display-6" : null}
            key={e.id}
            id={e.id}
          >
            {e.users[0].firstName} {e.users[0].lastName}
          </div>
        );
      })}
      {selected
        ? conversations.singleConversation.conversationMessages.map((e) => {
            return (
              <div
                style={
                  e.senderId === user.id ? { backgroundColor: "blue" } : null
                }
              >
                {e.content}
              </div>
            );
          })
        : null}
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => handleSend(e)}
      ></input>
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
