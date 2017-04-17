export default (sequelize, DataTypes) => {

	const Role = sequelize.define(
    'Role', 
    {
      name: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING
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
          Role.hasMany(models.User, { foreignKey: 'role_id' })
        }
      }
	  }
  )

	return Role

}
