import React from "react";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "./contexts/ContactsProvider";
import { ConversationsProvider } from "./contexts/ConversationsProvider";
import { SocketProvider } from "./contexts/SocketProvider";
import { selectUser } from "../../reducers/userSlice";
import { useSelector } from "react-redux";

function ChatPage() {
  const user = useSelector(selectUser);
  const id = user.id;

  return (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );
}

export default ChatPage;
