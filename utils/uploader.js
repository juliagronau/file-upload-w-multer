import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/");
    cb(null, `${file.fieldname}-${Date.now()}.${extension[1]}`);
  },
});

const fileFilter = (req, file, next) => {
  if (!file) {
    next(null, false);
  }
  const extension = file.mimetype.split("/");
  console.log(extension);
  if (
    extension[1] == "jpg" ||
    extension[1] == "jpeg" ||
    extension[1] == "png"
  ) {
    next(null, true);
  } else {
    next(
      new Error(
        "Unsupported Filetype. Accepted types are .png, .jpg, .jpeg"
      )
    );
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
