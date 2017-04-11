export default (sequelize, DataTypes) => {

	const User = sequelize.define(
    'User', 
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
      },
      money_total: {
        type: DataTypes.INTEGER
      },
      money_confirmed: {
        type: DataTypes.INTEGER
      },
      point_a: {
        type: DataTypes.INTEGER
      },
      point_b: {
        type: DataTypes.INTEGER
      }
    }, 
    {
      tableName: 'users',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          User.belongsTo(models.Program, { foreignKey: 'program_id' })
          User.belongsTo(models.Account, { foreignKey: 'account_id' })

          // пользователь может написать пост
          User.hasMany(models.Post, { foreignKey: 'user_id' })

          // пользователь может оставить лайк
          User.hasMany(models.Like, { foreignKey: 'user_id' })

          // пользователь может оставить комментарий
          User.hasMany(models.Comment, { foreignKey: 'user_id' })
          
          // У пользователя может быть много отметок с оценкой
          User.belongsToMany(models.NPS, { through: 'nps_users', foreignKey: 'user_id' })
          
          // Пользователь может иметь несколько полей в рамках программы
          User.belongsToMany(models.Role, { through: models.UserRole, foreignKey: 'user_id', as: 'Role' })

          // Пользователь может состоять в нескольких группах
          User.belongsToMany(models.Group, { through: 'user_groups', foreignKey: 'user_id', as: 'Groups' })
        }
      }
	  }
  )

	return User
}
