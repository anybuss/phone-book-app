import React, { useState, useEffect } from "react";

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface ContactFormProps {
  contact?: Contact;
  onSubmit: (contact: Contact) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ contact, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (contact) {
      setFormData(contact);
    }
  }, [contact]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-8">
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mt-2"
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mt-2"
      />
      <input
        type="tel"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mt-2"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        {contact ? "Update" : "Add"} Contact
      </button>
    </form>
  );
};

export default ContactForm;
