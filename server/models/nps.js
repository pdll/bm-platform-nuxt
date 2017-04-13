export default (sequelize, DataTypes) => {
  const NPS = sequelize.define(
    'NPS',
    {
      total: {
        type: DataTypes.DOUBLE
      },
      score_1: {
        type: DataTypes.INTEGER
      },
      score_2: {
        type: DataTypes.INTEGER
      },
      score_3: {
        type: DataTypes.INTEGER
      },
      comment: {
        type: DataTypes.TEXT
      }
    },
    {
      tableName: 'nps',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          // Запись рейтинга была оставлена пользователем
          NPS.belongsTo(models.User, { foreignKey: 'user_id' })

          // Запись рейтинга может быть привязана к пользователю
          NPS.belongsToMany(models.User, { through: 'nps_users', foreignKey: 'nps_id', as: 'UsersNps' })

          // Запись рейтинга может быть привязана к посту
          NPS.belongsToMany(models.Post, { through: 'nps_posts', foreignKey: 'nps_id', as: 'PostsNps' })

          // Запись рейтинга может быть привязана к занятию программы
          NPS.belongsToMany(models.ProgramClass, { through: 'nps_classes', foreignKey: 'nps_id', as: 'ProgramClassNps' })

          // Запись рейтинга может быть привязана к занятию программы
          NPS.belongsToMany(models.Program, { through: 'nps_program', foreignKey: 'nps_id', as: 'ProgramNps' })

          // Запись рейтинга может быть привязана к занятию программы
          NPS.belongsToMany(models.Group, { through: 'nps_group', foreignKey: 'nps_id', as: 'GroupNps' })
        }
      }
    }
  )

  return NPS
}