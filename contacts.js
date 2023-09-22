import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import { writeFile } from "fs";

const contactPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const results = contacts.find((contact) => contact.id === contactId);
  return results || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const results = contacts.splice(index, 1);
  return results;
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts));
  return newContact;
}
