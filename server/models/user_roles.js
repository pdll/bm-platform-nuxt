export default (sequelize, DataTypes) => {

	const UserRole = sequelize.define(
    'UserRole', 
    {
      is_enabled: {
        defaultValue: true,
        type: DataTypes.BOOLEAN
      }
    }, 
    {
      tableName: 'users_roles',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {}
      }
	  }
  )

	return UserRole
}
