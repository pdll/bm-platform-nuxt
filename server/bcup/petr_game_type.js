export default (sequelize, DataTypes) => {
  const PetrGameType = sequelize.define(
    'PetrGameType',
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
      tableName: 'petr_games_type',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          PetrGameType.hasMany(models.PetrGame, { foreignKey: 'type_id' })
        }
      }
    }
  )

  return PetrGameType
}