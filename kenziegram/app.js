import express from "express";
import multer from "multer";
import fs from "fs";

const app = express();

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

const path = "./public/uploads";

app.get("/", (req, res) => {
  fs.readdir(path, (err, items) => {
    console.log(items);
    res.render(`index`);
  });
});

app.listen(port, console.log(`Server running on port ${port}...`));
