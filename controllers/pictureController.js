import pool from "../db/pg.js";
import express from "express";
const app = express();
import path from "path";
app.use(express.static(path.resolve("../public")));

export const uploadProfilePic = (req, res) => {
  // console.log(req.file);
  if (!req.file) throw new Error("Please upload an image");
  pool
    .query(`INSERT INTO pictures (name, path) VALUES ($1, $2)`, [
      req.file.originalname,
      req.file.filename,
    ])
    .then((data) => console.log(data.rows))
    .catch((err) => res.status(500).json(err));
  res.send(
    `<h2>Here is the picture:</h2><img src='/${req.file.filename}' alt='avatar'/>`
  );
};

export const uploadCatPics = (req, res) => {
  console.log(req.files);
  req.files.map((pic) => {
    pool
      .query(`INSERT INTO pictures (name, path) VALUES ($1, $2)`, [
        pic.originalname,
        pic.filename,
      ])
      .then((data) => console.log(data.rows))
      .catch((err) => res.status(500).json(err));
  });
  res.send(
    `<div>${req.files.map(
      (file) =>
        `<img src=/${file.filename} alt=${file.originalname}></img>`
    )}</div>`
  );
};

export const getPics = (req, res) => {
  pool
    .query("SELECT * FROM pictures")
    .then((data) => {
      console.log(data.rows);
      res.send(
        `${data.rows
          .map(
            (file) => `<a href=/${file.path}>${file.name}</a><br />`
          )
          .join("")}`
      );
    })
    .catch((err) => console.log(err));
    
};
