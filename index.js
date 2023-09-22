import { program } from "commander";
import * as contactOperation from "./contacts.js";

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactsList = await contactOperation.listContacts();
      console.log("List contacts");
      return console.table(contactsList);
    case "get":
      const oneContact = await contactOperation.getContactById(id);
      console.log("Get contact");
      return console.table(oneContact);
    case "add":
      const newContact = await contactOperation.addContact(name, email, phone);
      console.log("Add contact");
      return console.table(newContact);
    case "remove":
      const removeContact = await contactOperation.removeContact(id);
      console.log("Remove contact");
      return console.table(removeContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();
const options = program.opts();
// console.log("options :>> ", options);
invokeAction(options);
