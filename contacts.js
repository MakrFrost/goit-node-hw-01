const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");
const { v4: uuidv4 } = require("uuid");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(contacts);
  } catch (err) {
    console.log(err.message);
  }
}
async function getContactById(id) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parseData = JSON.parse(data);
    const findId = parseData.find((item) => item.id === id.toString());
    return findId;
  } catch (err) {
    console.error(err);
  }
}
async function removeContacts(id) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");

    const parsedContacts = JSON.parse(contacts);

    const contactRemove = parsedContacts.filter(
      (contact) => contact.id !== id.toString()
    );
    await fs.writeFile(contactsPath, JSON.stringify(contactRemove), "utf-8");
  } catch (err) {
    console.log(err.message);
  }
}
async function addContact(id, name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContacts,
  addContact,
};
