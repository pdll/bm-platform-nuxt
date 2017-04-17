export default (sequelize, DataTypes) => {
  const NPSPlatform = sequelize.define(
    'NPSPlatform',
    {
      nps_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        referennces: {
          model: 'nps',
          field: 'id'
        }
      },
    },
    {
      tableName: 'nps_platform',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          NPSPlatform.belongsTo(models.NPS, { foreignKey: 'nps_id' })
        }
      }
    }
  )

  return NPSPlatform
}