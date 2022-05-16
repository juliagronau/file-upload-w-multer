import "dotenv/config.js";
import express from "express";
import path from "path";
import {
  getPics,
  uploadCatPics,
  uploadProfilePic,
} from "./controllers/pictureController.js";

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
  uploadProfilePic
);

app.post("/upload-cat-pics", upload.array("cat_pics"), uploadCatPics);

app.get("/get-pics", getPics);

app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
);
