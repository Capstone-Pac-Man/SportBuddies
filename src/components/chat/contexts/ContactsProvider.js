import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { SingleUserPage } from "../../users/singleUserPage";
const ContactsContext = React.createContext();

export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  function createContact(id, name) {
    setContacts((prevContacts) => {
      return [...prevContacts, { id, name }];
    });
  }

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      <SingleUserPage />
      {children}
    </ContactsContext.Provider>
  );
}
