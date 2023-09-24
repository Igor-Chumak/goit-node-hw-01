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
    case "update":
      const updateContact = await contactOperation.updateContact(id, name, email, phone);
      console.log("Update contact");
      return console.table(updateContact);
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

// # Получаем и выводим весь список контактов в виде таблицы (console.table)
// node index.js --action list

// # Получаем контакт по id - выводим в консоль объект контакта или null, если контакта с таким id не существует.
// node index.js --action get --id 05olLMgyVQdWRwgKfg5J6

// # Добавляем контакт и выводим в консоль созданный контакт
// node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

// # Удаляем контакт и выводим в консоль удаленный контакт или null, если контакта с таким id не существует.
// node index.js --action remove --id qdggE76Jtbfd9eWJHrssH

// # Обновляем  контакт и выводим в консоль обновленный контакт или null, если контакта с таким id не существует.
// node index.js --action update --id qdggE76Jtbfd9eWJHrssH --name Mango --email mango@gmail.com --phone 322-22-23
