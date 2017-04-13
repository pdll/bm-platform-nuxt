export default (sequelize, DataTypes) => {

	const ProgramRole = sequelize.define(
    'ProgramRole', 
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      is_enabled: {
        defaultValue: true,
        type: DataTypes.BOOLEAN
      }
    },
    {
      tableName: 'program_roles',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          ProgramRole.belongsToMany(models.User, { through: models.UserProgramRole, foreignKey: 'program_role_id' })
        }
      }
    }
  )

  return ProgramRole
}
