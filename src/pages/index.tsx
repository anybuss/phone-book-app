import React, { useState, useEffect } from "react";
import ContactForm from "../components/ContactForm";
import ContactsList from "../components/ContactsList";
import Modal from "../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faSearch } from "@fortawesome/free-solid-svg-icons";

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const openModal = (contact: Contact | null = null) => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingContact(null);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    fetch("/api/contacts")
      .then((response) => response.json())
      .then((data) => setContacts(data));
  }, []);

  const handleCreateOrUpdate = (contact: Contact) => {
    const updatedContacts = editingContact
      ? contacts.map((c) => (c.id === contact.id ? contact : c))
      : [...contacts, { ...contact, id: Date.now().toString() }];

    setContacts(updatedContacts);
    setEditingContact(null);
    closeModal();
    if (editingContact) {
      fetch(`/api/contacts/${contact.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      }).then(() => {
        setContacts(contacts.map((c) => (c.id === contact.id ? contact : c)));
        setEditingContact(null);
      });
    } else {
      fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      })
        .then((response) => response.json())
        .then((newContact) => {
          setContacts([...contacts, newContact]);
          setEditingContact(null);
        });
    }
  };

  const handleDelete = (id: string) => {
    fetch(`/api/contacts/${id}`, { method: "DELETE" }).then(() =>
      setContacts(contacts.filter((c) => c.id !== id))
    );
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl bg-gray-100">
      <header className="flex items-center justify-center my-6">
        <FontAwesomeIcon icon={faAddressBook} className="text-3xl mr-3" />
        <h1 className="text-4xl font-bold">Phone Book App</h1>
      </header>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Contacts</h2>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          + Add Contact
        </button>
      </div>
      <div className="relative flex mb-4 items-center">
        <input
          type="text"
          placeholder="Search for contact by last name..."
          className="flex-grow p-2 border border-gray-300 rounded-l pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="absolute left-2 top-2 text-gray-500">
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>
      <Modal show={isModalOpen} onClose={closeModal}>
        <ContactForm
          onSubmit={handleCreateOrUpdate}
          contact={editingContact as Contact}
        />
      </Modal>

      <ContactsList
        contacts={filteredContacts}
        onDelete={handleDelete}
        onEdit={(contact) => openModal(contact)}
      />
    </div>
  );
}
