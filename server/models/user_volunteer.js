export default (sequelize, DataTypes) => {
  const VolunteerUser = sequelize.define(
    'VolunteerUser',
    {
      status: {
        type: DataTypes.BOOLEAN
      }
    },
    {
      tableName: 'users_volunteer',
      createdAt: 'created_at',
		  updatedAt: 'updated_at',
      underscored: true,
      classMethods: {
        associate: (models) => {
          VolunteerUser.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreifgnKey: {
              allowNull: false
            }
          })
        }
      }
    }
  )

  return VolunteerUser
}