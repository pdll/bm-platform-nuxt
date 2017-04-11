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
          NPS.belongsTo(models.User, { through: 'nps_users', foreignKey: 'nps_id', as: 'UsersNps' })

          // Запись рейтинга может быть привязана к посту
          NPS.belongsTo(models.Post, { through: 'nps_posts', foreignKey: 'nps_id', as: 'PostsNps' })
        }
      }
    }
  )

  return NPS
}