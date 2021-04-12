module.exports = (app) => {
  const todoList = require("../controllers/todoList.js");

  var router = require("express").Router();

  // Create a new todoList
  router.post("/", todoList.create);

  // Retrieve all todoList
  router.get("/", todoList.findAll);

  // Update a todoList with id
  router.put("/:item_id", todoList.update);

  // Delete a todoList with id
  router.delete("/:item_id", todoList.delete);

  app.use("/api/todoList", router);
};
