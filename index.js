const {
  listContacts,
  getContactById,
  removeContacts,
  addContact,
} = require("./contacts.js");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.table(allContacts);

      break;

    case "get":
      console.log(id);
      getContactById(id);
      break;

    case "add":
      const newContact = await addContact(id, name, email, phone);
      console.log("newContact:", newContact);
      break;

    case "remove":
      const removeContact = await removeContacts(id);
      console.log("Contact removed");
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
