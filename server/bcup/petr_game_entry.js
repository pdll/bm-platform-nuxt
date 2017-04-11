export default (sequelize, DataTypes) => {
  const PetrGameEntry = sequelize.define(
    'PetrGameEntry',
    {
      data: {
        type: DataTypes.JSON
      },
      is_blocked: {
        defaultValue: false,
        type: DataTypes.BOOLEAN
      }
    },
    {
      tableName: 'petr_games_entry',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          PetrGameEntry.belongsTo(models.User, { foreignKey: 'user_id' })
          PetrGameEntry.belongsTo(models.PetrGame, { foreignKey: 'petr_game_entry_id' })
        }
      }
    }
  )

  return PetrGameEntry
}