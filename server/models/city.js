export default (sequelize, DataTypes) => {

	const City = sequelize.define(
    'City',
    {
      name: {
        type: DataTypes.STRING
      }
    },
    {
      tableName: 'cities',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          City.hasMany(models.UserProgram, { foreignKey: 'city_id' })
        }
      }
    }
  )
  
  return City
}