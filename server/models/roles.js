export default (sequelize, DataTypes) => {

	const Role = sequelize.define(
    'Role', 
    {
      name: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      is_enabled: {
        defaultValue: true,
        type: DataTypes.BOOLEAN
      }
    }, 
    {
      tableName: 'roles',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          // Каждую роль может иметь множество пользователей
          Role.belongsToMany(models.User, { through: models.UserRole, foreignKey: 'role_id' })
        }
      }
	  }
  )

	return Role

}
