export default (sequelize, DataTypes) => {
  const GameGroup = sequelize.define(
    'GameGroup',
    {
      title: {
        type: DataTypes.STRING
      },
      is_blocked: {
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      type: {
        allowNull: false,
        defaultValue: 'ten',
        type: DataTypes.ENUM([ 'polk', 'hundred', 'ten' ])
      }
    },
    {
      tableName: 'game_groups',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          GameGroup.hasMany(GameGroup, { foreignKey: 'parent_id' })
          GameGroup.hasMany(models.User, { foreignKey: 'game_group_id', as: 'Users' })
        }
      }
    }
  )

  return GameGroup
}