// Support Ticket Console App
// Start

// Show menu
// Get user choice

// choice = 1
// create ticket

// choice = 2
// view tickets

// choice = 3
// search ticket

// choice = 4
// update ticket status

// choice = 5
// delete ticket

// choice = 6
// exit

// Repeat until user exits

// Include readline module
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let tickets = [];
let nextId = 1;

// My Main Menu
function showMenu() {
  console.log("\n~~~~~~~~~~~~ SUPPORT TICKET SYSTEM ~~~~~~~~~~~~");
  console.log("1. Create Ticket");
  console.log("2. Show Tickets");
  console.log("3. Search Ticket");
  console.log("4. Update Ticket Status");
  console.log("5. Delete Ticket");
  console.log("6. Exit");

  rl.question("Choose a number: ", function(choice) { 
    switch(choice) { 
      case "1": createTicket();
      break;            
      case "2": viewTickets();
      break;
      case "3": searchTicket();
      break;
      case "4": updateTicket();
      break;            
      case "5": deleteTicket();
      break;           
      case "6": console.log("Exit");
      rl.close();
      break;            
      default: console.log("Invalid choice.");
      showMenu();
    } 
  });
}

// Create Ticket
function createTicket() {
  rl.question("Enter your ticket title: ", function(title) {
    rl.question("Enter your ticket description: ", function(description) {
      rl.question("Enter your priority level (Low / Medium / High): ", function(priority) {
        if (priority === "Low" || priority === "Medium" || priority === "High") {
          let ticket = { 
            id: nextId,
            title: title,
            description: description,
            status: "Open",
            priority: priority,
            createdAt: new Date()
          }
          tickets.push(ticket);
          nextId++;
          console.log("Ticket has been created successfully!");
          showMenu();
        }
        else {
          console.log("Invalid priority. Choose from Low/Medium/High.");
          createTicket();
          }
      });
    });
  });
}

// View Tickets
function viewTickets() {
  if (tickets.length === 0) {
    console.log("No tickets found.");
  } else {
    console.log("\n~~~~~~~~~~~~~~~~~ TICKET LIST ~~~~~~~~~~~~~~~~~");
    for (let i = 0; i < tickets.length; i++) {
      console.log("ID:", tickets[i].id);
      console.log("Title:", tickets[i].title);
      console.log("Description:", tickets[i].description);
      console.log("Status:", tickets[i].status);
      console.log("Priority:", tickets[i].priority);
      console.log("Date Created:", tickets[i].createdAt);
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    }
  }
  showMenu();
}

// Search Menu
function searchTicket() {
  console.log("\nSearch By:");
  console.log("1. Ticket ID");
  console.log("2. Open Tickets");
  console.log("3. Closed Tickets");
  console.log("4. Low Priority");
  console.log("5. Medium Priority");
  console.log("6. High Priority");
  rl.question("Choose search option: ", function(choice) {
    switch(choice) {
      case "1": searchById();
      break;
      case "2": searchByStatus("Open");
      break;
      case "3": searchByStatus("Closed");
      break;
      case "4": searchByPriority("Low");
      break;
      case "5": searchByPriority("Medium");
      break;
      case "6": searchByPriority("High");
      break;
      default: console.log("Invalid option.");
      showMenu();
    }
  });
}

// Search by ID
function searchById() {
  rl.question("Enter Ticket ID: ", function(id) {
    let found = false;
    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i].id == id) {
        console.log("\nTicket Found:");
        console.log(tickets[i]);
        found = true;
        break;
      }
    }
    if (!found) {
      console.log("\nTicket not found.");
    }
    showMenu();
  });
}

// Search by Status
function searchByStatus(status) {
  let found = false;
  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i].status === status) {
      console.log("\nTicket Found:");
      console.log(tickets[i]);
      found = true;
    }
  }
  if (!found) {
    console.log("\nNo tickets found.");
  }
  showMenu();
}

// Search by Priority
function searchByPriority(priority) {
  let found = false;
  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i].priority === priority) {
      console.log("\nTicket Found:");
      console.log(tickets[i]);
      found = true;
    }
  }
  if (!found) {
    console.log("\nNo tickets found.");
  }
  showMenu();
}

// Update Ticket Status
function updateTicket() {
  rl.question("\nEnter ticket ID to update: ", function(id) {
    let found = false;
    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i].id == id) {
        rl.question("\nEnter new status (Open / Closed): ", function(status) {
          if (status === "Open" || status === "Closed") {
            tickets[i].status = status;
            console.log("\nTicket has been updated!");
            showMenu();
          } else {
            console.log("\nInvalid status. Please enter Open or Closed.");
            updateTicket();
          }
        });
        found = true;
        break;
      }
    }
    if (!found) {
      console.log("\nTicket not found.");
      showMenu();
    }
  });
}

// Delete Ticket
function deleteTicket() {
  rl.question("Enter ticket ID to delete: ", function(id) {
    let found = false;
    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i].id == id) {
        tickets.splice(i, 1);
        console.log("\nTicket has been deleted.");
        found = true;
        break;
      }
    }
    if (!found) {
      console.log("Ticket not found.");
    }
    showMenu();
  });
}
showMenu();