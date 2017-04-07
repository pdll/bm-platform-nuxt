export default (sequelize, DataTypes) => {
  const PetrGame = sequelize.define(
    'PetrGame',
    {
      name: {
        type: DataTypes.STRING
      },
      start_at: {
        type: DataTypes.DATE
      },
      finish_at: {
        type: DataTypes.DATE
      },
      is_blocked: {
        defaultValue: false,
        type: DataTypes.BOOLEAN
      }
    },
    {
      tableName: 'petr_games',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          PetrGame.belongsTo(models.PetrGameType, { foreignKey: 'type_id' })
        }
      }
    }
  )

  return PetrGame
}