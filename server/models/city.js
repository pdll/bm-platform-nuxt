export default (sequelize, DataTypes) => {
  /*
    Модель описывает города.
    Пока что город привязывается только к участию пользователя в программе.
  */
	const City = sequelize.define(
    'City',
    {
      name: {
        unique: true,
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