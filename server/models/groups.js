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
          // В группе есть много людей
          Group.belongsToMany(models.User, { through: 'users_groups', foreignKey: 'group_id', as: 'Users' })
          
          // у группы есть лидер
          Group.belongsTo(models.User, { foreignKey: 'leader_id', as: 'Leader' })

          // группа может принадлежать программе
          Group.belongsTo(models.Program, { foreignKey: 'program_id', as: 'Program' })

          // у группы может быть рейтинг
          Group.belongsToMany(models.NPS, { through: 'nps_group', foreignKey: 'group_id', as: 'Nps' })
        }
      }
    }
  )

  return Group
}