import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../reducers/userSlice";
import React, { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import Conversations from "./Conversations";

const CONVERSATIONS_KEY = "conversations";

export default function Sidebar() {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  const user = useSelector(selectUser);
  const id = user.id;

  return (
    <div
      style={{ width: "250px", height: "90%" }}
      className="d-flex flex-column"
    >
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations id={id} />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border small">
          Your User Id: <span className="text-muted">{id}</span>
        </div>
      </Tab.Container>
    </div>
  );
}
