export default (sequelize, DataTypes) => {
  const Income = sequelize.define(
    'Income',
    {
      ammount: {
        allowNull: false,
        type: DataTypes.BIGINT
      },
      is_confirmed: {
        type: DataTypes.BOOLEAN
      }
    },
    {
      tableName: 'incomes',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          // Доход относится к пользователю]
          Income.belongsTo(models.User, { foreignKey: 'user_id' })

          // Доход относится к цели
          Income.belongsTo(models.Goal, { foreignKey: 'goal_id' })

          // Доход относится к цели
          Income.belongsTo(models.TaskReply, { foreignKey: 'task_reply_id' })
        }
      }
    }
  )

  return Income
}