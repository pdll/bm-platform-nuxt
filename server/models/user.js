export default (sequelize, DataTypes) => {

	const User = sequelize.define(
    'User', 
    {
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING, unique: true
      },
      first_name: {
        type: DataTypes.STRING
      },
      last_name: {
        type: DataTypes.STRING
      },
      birthday: {
        type: DataTypes.DATE
      },
      gender: {
        type: DataTypes.ENUM([ 'male', 'female' ])
      },
      locale: {
        type: DataTypes.STRING(12)
      },
      timezone: {
        type: DataTypes.INTEGER
      },
      remote_ip: {
        type: DataTypes.STRING
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
          // Юзер может участвовать в множестве програм
          User.belongsToMany(models.Program, { foreignKey: 'user_id', as: 'Program', through: models.UserProgram })

          // пользователь может написать пост
          User.hasMany(models.Post, { foreignKey: 'user_id' })

          // пользователь может оставить лайк
          User.hasMany(models.Like, { foreignKey: 'user_id' })

          // пользователь может оставить комментарий
          User.hasMany(models.Comment, { foreignKey: 'user_id' })

          // Пользователь может поставить себе цель
          User.hasMany(models.Goal, { foreignKey: 'user_id' })

          // Пользователь может состоять в нескольких группах
          User.belongsToMany(models.Group, { through: 'user_groups', foreignKey: 'user_id', as: 'Groups' })

          // Пользователь может быть лидером групп
          User.hasMany(models.Group, { foreignKey: 'leader_id', as: 'GroupsLeader' })
          
          // У пользователя может быть много отметок с оценкой
          User.belongsToMany(models.NPS, { through: 'nps_users', foreignKey: 'user_id', as: 'Nps' })

          //
          User.hasMany(models.NPS, { foreignKey: 'user_id', as: 'NpsAuthor' })

          // Юзер может быть автором многих заданий
          User.hasMany(models.TaskEntry, { foreignKey: 'user_id' })
          
          // Пользователь имееют одну роль глобальную
          User.belongsTo(models.Role, { foreignKey: 'role_id' })

          // пользователь может иметь много ролей в программах
          User.belongsToMany(models.ProgramRole, { through: models.UserProgramRole, foreignKey: 'user_id', as: 'ProgramRoles' })

          // У пользователя есть доход
          User.hasMany(models.Income, { foreignKey: 'user_id' })
        }
      }
	  }
  )

	return User
}
