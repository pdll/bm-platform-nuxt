export default (sequelize, DataTypes) => {
  const Group = sequelize.define(
    'Group',
    {
      title: {
        type: DataTypes.STRING
      },
      is_blocked: {
        defaultValue: false,
        type: DataTypes.BOOLEAN
      }
    },
    {
      tableName: 'groups',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          Group.belongsToMany(models.User, { through: 'user_groups', foreignKey: 'group_id', as: 'Users' })
          Group.belongsTo(models.User, { foreignKey: 'leader_id', as: 'Leader' })
        }
      }
    }
  )

  return Group
}