export default (sequelize, DataTypes) => {
  const CoachGroup = sequelize.define(
    'CoachGroup',
    {
      group_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        referennces: {
          model: 'group',
          field: 'id'
        }
      }
    },
    {
      tableName: 'groups_coach',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          CoachGroup.belongsTo(models.Group, { foreignKey: { field: 'group_id', primaryKey: true, allowNull: false } })
        }
      }
    }
  )

  return CoachGroup
}