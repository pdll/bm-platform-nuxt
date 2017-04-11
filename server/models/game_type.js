export default (sequelize, DataTypes) => {
  const GameType = sequelize.define(
    'GameType',
    {
      name: {
        type: DataTypes.STRING
      },
      data: {
        type: DataTypes.JSON
      },
      answer_data: {
        type: DataTypes.JSON
      },
      is_blocked: {
        defaultValue: false,
        type: DataTypes.BOOLEAN
      }
    },
    {
      tableName: 'games_type',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          GameType.hasMany(models.Game, { foreignKey: 'game_type_id' })
        }
      }
    }
  )

  return GameType
}