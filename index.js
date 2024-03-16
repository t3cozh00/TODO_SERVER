// part6_add a require statement to use environment variables.
require("dotenv").config();
//console.log(process.env);

const express = require("express");
const cors = require("cors");
//const { Pool } = require("pg");
//const { query } = require("./helpers/db.js");
// part7_starts the server and delegates all calls to todoRouter.
const { todoRouter } = require("./routes/todo.js");

const app = express();
app.use(cors());
// allows reading posted values from the client as JSON.
app.use(express.json());

// part5_Since the id for the deleted task is passed as a part of url, you need to define, that express is able to read parameters from url address.
app.use(express.urlencoded({ extended: false }));
// part7_starts the server and delegates all calls to todoRouter
app.use("/", todoRouter);

// part6_Instead of using hardcoded value read port from .env file
//const port = 3001;
const port = process.env.PORT;

// part6_App.get route returns tasks from the backend.
// part7_add all required routes to routes >> todo.js file, change the app for todoRouter
// app.get("/", async (req, res) => {
//   console.log(query);
//   try {
//     const result = await query("select * from task");
//     const rows = result.rows ? result.rows : [];
//     res.status(200).json(result.rows);
//   } catch (error) {
//     console.log(error);
//     res.statusMessage = error;
//     res.status(500).json({ error: error });
//   }
// });

// part6_Instead of using hardcoded values for database connection read data from .env file
// const openDb = () => {
//   const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "todo",
//     password: "9008",
//     port: 5432,
//   });
//   return pool;
// };

// part6_On index.Js remove unnecessary require statements. Index.js will be modified in a way that it does not handle database logic but it is done through query function. You may also remove the openDb function from index.js (since it is now implemented on db.js)
// const openDb = () => {
//   const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
//   });
//   return pool;
// };

// post handler:  receive value(s) from the client and execute insert into statement into the database
// part6_App.post is modified to use query the same way as App.get
// part7_same as App.get
// app.post("/new", async (req, res) => {
//   try {
//     const result = await query(
//       "insert into task (description) values ($1) returning *",
//       [req.body.description]
//     );
//     res.status(200).json({ id: result.rows[0].id });
//   } catch (error) {
//     console.log(error);
//     res.statusMessage = error;
//     res.status(500).json({ error: error });
//   }
// });

// part5_ implementing deletion functionality in the backend. Create a delete method, that receives id as a query parameter (e.g., http://localhost:3001/delete/1).
// part6_Also, modify App.delete. The backend should now be working. Database logic is now moved into db.js.
// part7_same as App.get
// app.delete("/delete/:id", async (req, res) => {
//   const id = Number(req.params.id);
//   try {
//     const result = await query("delete from task where id = $1", [id]);
//     res.status(200).json({ id: id });
//   } catch (error) {
//     console.log(error);
//     res.statusMessage = error;
//     res.status(500).json({ error: error });
//   }
// });

app.listen(port);
