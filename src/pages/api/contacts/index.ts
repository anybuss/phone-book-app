import type { NextApiRequest, NextApiResponse } from "next";

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

let contacts: Contact[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(contacts);
  } else if (req.method === "POST") {
    const newContact: Contact = { ...req.body, id: Date.now().toString() };
    contacts.push(newContact);
    res.status(201).json(newContact);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
