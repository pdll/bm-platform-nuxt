export default (sequelize, DataTypes) => {
  const Game = sequelize.define(
    'Game',
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
      tableName: 'games',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          Game.belongsTo(models.GameType, { foreignKey: 'game_type_id' })
          Game.hasMany(models.GameEntry, { foreignKey: 'game_id' })
        }
      }
    }
  )

  return Game
}