module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username already exists! Too late! Ha!",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return User;
};
