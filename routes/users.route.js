const express = require("express");
const shortid = require("shortid");

const db = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("users/index", {
    users: db.get("users").value()
  });
});

router.get("/create", (req, res) => {
  res.render("users/create");
});

router.post("/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
});

router.get("/edit/:id", (req, res) => {
  let user = db
    .get("users")
    .find({ id: req.params.id })
    .value();
  res.render("users/edit", {
    id: user.id,
    oldName: user.name,
    oldPhone: user.phone
  });
});

router.post("/edit", (req, res) => {
  db.get("users")
    .find({ id: req.body.id })
    .assign(req.body)
    .write();
  res.redirect("/users");
});

router.get("/delete/:id", (req, res) => {
  db.get("users")
    .remove({ id: req.params.id })
    .write();
  res.redirect("/users");
});

module.exports = router;
