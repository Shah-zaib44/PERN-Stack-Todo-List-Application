const db = require("../models");
const todoList = db.todoLists;
const Op = db.Sequelize.Op;

// Create and Save a new todoList
exports.create = (req, res) => {
  // Validate request
  if (!req.body.item) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a todoList
  const todoListData = {
    item: req.body.item,
  };

  // Save todoList in the database
  todoList
    .create(todoListData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the todoList.",
      });
    });
};

// Retrieve all todoList from the database.
exports.findAll = (req, res) => {
  // const item = req.query.item;
  // var condition = title ? { item: { [Op.like]: `%${item}%` } } : null;

  todoList
    .findAll({ where: {}, order: [["item_id", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving todoList.",
      });
    });
};

// Update a todoList by the id in the request
exports.update = (req, res) => {
  const item_id = req.params.item_id;

  todoList
    .update(req.body, {
      where: { item_id: item_id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "todoList was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update todoList with id=${item_id}. Maybe todoList was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating todoList with id=" + item_id,
      });
    });
};

// Delete a todoList with the specified id in the request
exports.delete = (req, res) => {
  const item_id = req.params.item_id;

  todoList
    .destroy({
      where: { item_id: item_id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "todoList was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete todoList with id=${item_id}. Maybe todoList was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete todoList with id=" + item_id,
      });
    });
};
