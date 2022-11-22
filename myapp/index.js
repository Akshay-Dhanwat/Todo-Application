const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
let db = null;

const dbPath = path.join(__dirname, "goodreads.db");

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error is ${e.message}`);
    process.exit(1);
  }
};
initializeDbAndServer();

app.get("/books/", async (request, response) => {
  const getBookQuery = `
    SELECT * 
    FROM book
    ORDER BY book_id;
    `;
  const booksArray = await db.all(getBookQuery);
  response.send(booksArray);
});
