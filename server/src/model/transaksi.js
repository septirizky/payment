import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class transaksi extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    transaksi_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    transaksi_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    transaksi_harga: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    transaksi_bank_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'bank',
        key: 'bank_id'
      }
    },
    transaksi_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
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
    tableName: 'transaksi',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "transaksi_pkey",
        unique: true,
        fields: [
          { name: "transaksi_id" },
        ]
      },
    ]
  });
  }
}
