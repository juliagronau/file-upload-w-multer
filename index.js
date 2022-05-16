import express from "express";
import path from "path";

import { upload } from "./utils/uploader.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) =>
  res.sendFile(path.resolve("./index.html"))
);

app.post(
  "/upload-profile-pic",
  upload.single("profile_pic"),
  (req, res) => {
    // console.log(req.file);
    if (!req.file) throw new Error("Please upload an image");
    res.send(
      `<h2>Here is the picture:</h2><img src='/${req.file.filename}' alt='avatar'/>`
    );
  }
);

app.post("/upload-cat-pics", upload.array("cat_pics"), (req, res) => {
  // console.log(req.files);
  res.send(
    `<div>${req.files.map(
      (file) => `<img src=/${file.filename}></img>`
    )}</div>`
  );
});

app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
);
