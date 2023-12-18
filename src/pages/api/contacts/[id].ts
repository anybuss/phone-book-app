import type { NextApiRequest, NextApiResponse } from "next";

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

let contacts: Contact[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const index = contacts.findIndex((c) => c.id === id);
    if (index >= 0) {
      contacts[index] = { ...contacts[index], ...req.body };
      res.json(contacts[index]);
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } else if (req.method === "DELETE") {
    contacts = contacts.filter((c) => c.id !== id);
    res.status(204).end();
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
