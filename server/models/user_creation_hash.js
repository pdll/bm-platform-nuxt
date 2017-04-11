export default (sequelize, DataTypes) => {
	const UserActivation = sequelize.define(
    'UserActivation',
    {
      hash: {
        unique: true,
        type: DataTypes.STRING(60).BINARY          
      },
      is_enabled: {
        defaultValue: true,
        type: DataTypes.BOOLEAN
      },
      activated_at: {
        type: DataTypes.DATE
      }
    },
    {
      tableName: 'users_activation',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          // пользователь может написать пост
          UserActivation.belongsTo(models.Program, { foreignKey: 'program_id', as: 'Program' })

          // пользователь может оставить лайк
          UserActivation.belongsTo(models.Account, { foreignKey: 'account_id', as: 'Account' })

          // пользователь может оставить лайк
          UserActivation.belongsTo(models.User, { foreignKey: 'user_id', as: 'User' })
        }
      }
    }
  )

  return UserActivation
}