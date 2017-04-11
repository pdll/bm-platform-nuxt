export default (sequelize, DataTypes) => {
  const GameGroup = sequelize.define(
    'GameGroup',
    {
      group_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        referennces: {
          model: 'group',
          field: 'id'
        }
      },
      type: {
        allowNull: false,
        defaultValue: 'ten',
        type: DataTypes.ENUM([ 'polk', 'hundred', 'ten' ])
      }
    },
    {
      tableName: 'groups_game',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          GameGroup.belongsTo(models.Group, { foreignKey: { field: 'group_id', primaryKey: true, allowNull: false } })
          GameGroup.belongsTo(GameGroup, { foreignKey: 'parent_id', as: 'ParentGroup' })
          GameGroup.hasMany(GameGroup, { foreignKey: 'parent_id', as: 'ChildGroups' })
        }
      }
    }
  )

  return GameGroup
}