export default (sequelize, DataTypes) => {

	const ProgramRole = sequelize.define(
    'ProgramRole', 
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
      tableName: 'program_roles',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          ProgramRole.hasMany(models.ProgramRole, { foreignKey: 'program_role_id' })

        }
      }
    }
  )

  return ProgramRole
}
