export default (sequelize, DataTypes) => {

	const UserProgram = sequelize.define(
    'UserProgram', 
    {
      price: {
        type: DataTypes.INTEGER
      },
      is_activated: {
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      activated_at: {
        type: DataTypes.DATE
      },
      hash: {
        type: DataTypes.STRING(60).BINARY
      }
    },
    {
      tableName: 'users_programs',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          UserProgram.belongsTo(models.City, { foreignKey: 'city_id' })

          UserProgram.belongsTo(models.Program, { foreignKey: 'program_id' })

          UserProgram.belongsTo(models.User, { foreignKey: 'user_id' })
        }
      }
    }
  )

  return UserProgram
}