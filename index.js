const express = require("express");
const app = express();
const db = require("./db/dbconnect");
const cookieParser = require("cookie-parser");
const notesRouter = require("./route/notesRouter");
const userRouter = require("./route/userRouter");
require('dotenv').config({
  path: './config/key.env'
})

//server
app.listen(3000, () => {
  console.log("Server Is Running On Port 3000");
});

//db
db();

//middleware
app.use(express.json());
app.use(cookieParser(process.env.COOKIES_SECRET));
app.use("/notes", notesRouter);
app.use("/user", userRouter);
