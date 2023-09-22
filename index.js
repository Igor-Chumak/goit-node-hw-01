import * as contactOperation from "./contacts.js";

const invokeActions = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactsList = await contactOperation.listContacts();
      return console.table(contactsList);
    case "get":
      const oneContact = await contactOperation.getContactById(id);
      return console.table(oneContact);
    case "add":
      const newContact = await contactOperation.addContact(name, email, phone);
      return console.table(newContact);
    default:
      console.log("Unknown action");
  }
};

// # Получаем и выводим весь список контактов в виде таблицы (console.table)
// invokeActions({ action: "list" });
// node index.js --action list
// # Получаем контакт по id - выводим в консоль объект контакта или null, если контакта с таким id не существует.
// invokeActions({ action: "get", id: "05olLMgyVQdWRwgKfg5J6" });
// node index.js --action get --id 05olLMgyVQdWRwgKfg5J6
// # Добавляем контакт и выводим в консоль созданный контакт
invokeActions({ action: "add", name: "Mango", email: "mango@gmail.com", phone: "22-22-22" });
// node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22
// # Удаляем контакт и выводим в консоль удаленный контакт или null, если контакта с таким id не существует.
// invokeActions({ action: "remove", id: "qdggE76Jtbfd9eWJHrssH" });
// node index.js --action remove --id qdggE76Jtbfd9eWJHrssH
