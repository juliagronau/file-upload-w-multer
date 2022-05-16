import express from "express";
import multer from "multer";
import path from "path";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.resolve("./public")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/");
    cb(null, `${file.fieldname}-${Date.now()}.${extension[1]}`);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) =>
  res.sendFile(path.resolve("./index.html"))
);

app.post(
  "/upload-profile-pic",
  upload.single("profile_pic"),
  (req, res) => {
    console.log(req.file);
    if (!req.file) throw new Error("Please upload an image");
    res.send(
      `<h2>Here is the picture:</h2><img src='/${req.file.filename}' alt='avatar'/>`
    );
  }
);

app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
);
