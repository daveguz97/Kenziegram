import express from "express";
import multer from "multer";
import fs from "fs";
import { v4 as uuid } from "uuid";
import path from "path";

const app = express();

const port = 3000;

app.use(express.static("./public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public/uploads"),
  filename: (req, file, cb) => {
    const fileName = `${uuid()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  const path = "./public/uploads";
  fs.readdir(path, (err, items) => {
    let images = items.map((image) => {
      return `<img src="./uploads/${image}" />`;
    });
    res.send(`
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&family=Yellowtail&display=swap');

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-size: 1.3rem;
        font-family: 'Noto Sans JP', sans-serif;
        background-color: #eee;
      }

      main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
      }

      #logo {
        background: linear-gradient(to left, purple, blue);
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 2.5rem;
        font-family: 'Yellowtail', cursive;
      }

     #logo h1 {
        color: white
      }

      form {
        margin: 1rem 0;
      }

      form button {
        padding: .5rem .8rem;
        background: #00efff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }

      form button:hover {
        transition: all .3s ease;
        background: #00cfff;
      }

      .images {
        margin-top: 2rem;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 10px;
      }

      .images img {
        width: 200px;
        height: 200px;
        border-radius: 5px;
      }

      @media screen and (max-width: 1024px) {
        .images {
          grid-template-columns: repeat(3, 1fr);
        }
      }
    </style>
    <main>
      <div id="logo">
        <h1>Kenziegram</h1>
      </div>
      <form action="/upload" method="POST" enctype="multipart/form-data">
        <input type="file" name="myImage" />
      <button type="submit" class="btn btn-primary">Upload</button>
      </form>
      <div class="images">
        ${images.join("")}
      </div>
      </main>
    `);
  });
});

app.post("/upload", upload.single("myImage"), (req, res) => {
  res.send(`<h1>File Uploaded!</h1>
            <a href="/">Go back</a>`);
});

app.listen(port, () => {
  console.log(`Server started on port ${port} `);
});
