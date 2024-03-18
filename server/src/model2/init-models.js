import _sequelize, { Sequelize } from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _bank from "./bank.js";
import _transaksi from "./transaksi.js";
import _users from "./users.js";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: "postgres",
    port: "5433",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

function initModels(sequelize) {
  const bank = _bank.init(sequelize, DataTypes);
  const transaksi = _transaksi.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  transaksi.belongsTo(bank, {
    as: "transaksi_bank",
    foreignKey: "transaksi_bank_id",
  });
  bank.hasMany(transaksi, {
    as: "transaksis",
    foreignKey: "transaksi_bank_id",
  });
  users.belongsTo(bank, { as: "user_bank", foreignKey: "user_bank_id" });
  bank.hasMany(users, { as: "users", foreignKey: "user_bank_id" });
  transaksi.belongsTo(users, {
    as: "transaksi_user",
    foreignKey: "transaksi_user_id",
  });
  users.hasMany(transaksi, {
    as: "transaksis",
    foreignKey: "transaksi_user_id",
  });

  return {
    bank,
    transaksi,
    users,
  };
}
const models = initModels(sequelize);
export default models;
export { sequelize };
