import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class users extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        user_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        user_saldo: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        user_bank_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "bank",
            key: "bank_id",
          },
        },
        createdat: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updateat: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        email: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        image: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "users",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "users_pkey",
            unique: true,
            fields: [{ name: "user_id" }],
          },
        ],
      }
    );
  }
}
