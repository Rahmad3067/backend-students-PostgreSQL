const express = require('express');
const app = express();
const dotenv = require("dotenv");
const { Pool } = require("pg");
dotenv.config({
  path: "./config.env"
});
app.use(express.json());


// Connecting to our Data Base PostgreSQL
const Postgres = new Pool({ ssl: {rejectUnauthorized:false} });




app.post("/students", async ( req,res ) =>{
  const username = req.body;
  try{
    await Postgres.query("INSERT INTO class_students(name) VALUES($1)", [
      username.name
    ]);
    return res.status(201).json({
      message:"Success",
    })
  } catch (err) {
    return res.status(400).json({
      message:"An error happened...",
    })
  }
})

app.get("/students", async ( req,res ) =>{
  let allStudents;
  try{
    allStudents = await Postgres.query("SELECT * FROM class_students");
    return res.status(201).json({
      message:"Success",
      data: allStudents.rows,
    })
  } catch (err) {
    return res.status(400).json({
      message: "An error happened..."
    })
  }
})

app.listen(4000, () => {
    console.log("Listening on Port");
});