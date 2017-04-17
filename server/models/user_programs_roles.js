export default (sequelize, DataTypes) => {

	const UserProgramRole = sequelize.define(
    'UserProgramRole', 
    {
      is_enabled: {
        defaultValue: true,
        type: DataTypes.BOOLEAN
      }
    },
    {
      tableName: 'users_programs_roles',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          // запись принадлежит программе
         UserProgramRole.belongsTo(models.Program, { foreignKey: 'program_id' }) 
         UserProgramRole.belongsTo(models.User, { foreignKey: 'user_id' })
         UserProgramRole.belongsTo(models.ProgramRole, { foreignKey: 'program_role_id' })
        }
      }
    }
  )

  return UserProgramRole
}