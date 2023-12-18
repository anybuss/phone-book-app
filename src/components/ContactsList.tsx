import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPhone } from "@fortawesome/free-solid-svg-icons";

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface ContactsListProps {
  contacts: Contact[];
  onDelete: (id: string) => void;
  onEdit: (contact: Contact) => void;
}

const ContactsList: React.FC<ContactsListProps> = ({
  contacts,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="max-w-3xl mx-auto my-8">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="flex items-center justify-between p-4 border-b border-gray-200 bg-white"
        >
          <div>
            <p className="font-bold">
              {contact.firstName} {contact.lastName}
            </p>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-gray-500 text-xs mr-2"
              />
              <p className="text-sm text-gray-600">{contact.phoneNumber}</p>
            </div>
          </div>
          <div>
            <button
              onClick={() => onEdit(contact)}
              className="text-green-500 hover:text-green-700 mr-2"
            >
              <FontAwesomeIcon
                icon={faEdit}
                className="text-lg bg-green-100 p-1 rounded"
              />
            </button>
            <button
              onClick={() => onDelete(contact.id)}
              className="text-red-500 hover:text-red-700"
            >
              <FontAwesomeIcon
                icon={faTrash}
                className="text-lg bg-red-100 p-1 rounded"
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactsList;
