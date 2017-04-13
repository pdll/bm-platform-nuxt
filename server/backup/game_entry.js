export default (sequelize, DataTypes) => {
  const GameEntry = sequelize.define(
    'GameEntry',
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
      tableName: 'games_entry',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          GameEntry.belongsTo(models.User, { foreignKey: 'user_id' })
          GameEntry.belongsTo(models.Game, { foreignKey: 'game_id' })
        }
      }
    }
  )

  return GameEntry
}