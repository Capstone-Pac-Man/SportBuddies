import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  selectConversations,
  fetchAllUserConversations,
} from "../../reducers/conversationSlice";
import { selectUser } from "../../reducers/userSlice";

export default function Conversations(props) {
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const dispatch = useDispatch();
  const id = props.id;
  const conversations = useSelector((state) => state.conversation);
  console.log(id);

  useEffect(() => {
    dispatch(fetchAllUserConversations(id));
  }, []);

  if (!conversations) return "Loading....";
  console.log(conversations);

  return (
    <ListGroup variant="flush">
      {conversations.map((conversation) => (
        <ListGroup.Item
          key={conversation.id}
          action
          onClick={() => setSelectedConversationIndex(conversation.id)}
          active={conversation.id === selectedConversationIndex}
        >
          {conversation.userConversations[0].recipients
            .map((r) => r.user.fullName)
            .join(", ")}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
