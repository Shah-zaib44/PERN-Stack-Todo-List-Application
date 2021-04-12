module.exports = (sequelize, Sequelize) => {
  const todoList = sequelize.define("todoLists", {
    item_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    item: {
      type: Sequelize.STRING,
    },
  });

  return todoList;
};
