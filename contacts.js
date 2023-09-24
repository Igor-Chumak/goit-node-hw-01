import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactPath = path.resolve("db", "contacts.json");

const updateContacts = (contacts) => {
  fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
};

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
  const [results] = contacts.splice(index, 1);
  await updateContacts(contacts);
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
  await updateContacts(contacts);
  return newContact;
}

export const updateContact = async (contactId, name, email, phone) => {
  // const { name, email, phone } = body;
  // let index = -1;
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  contacts[index] = { ...contacts[index], ...{ name, email, phone } };
  // console.log("contacts :>> ", contacts);
  // const updatedContacts = contacts.map(
  //   (contact) =>
  //     (contact = contact.id === contactId ? { ...contact, ...{ name, email, phone } } : contact)
  // );
  console.log("updatedContacts :>> ", contacts);
  // console.log("updatedContacts :>> ", updatedContacts);
  // await updateContacts(updatedContacts);
  // return updatedContacts;
  return contacts[index];
};
