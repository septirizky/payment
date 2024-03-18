import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class bank extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    bank_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    bank_name: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    bank_saldo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createdat: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updateat: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'bank',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "bank_pkey",
        unique: true,
        fields: [
          { name: "bank_id" },
        ]
      },
    ]
  });
  }
}
