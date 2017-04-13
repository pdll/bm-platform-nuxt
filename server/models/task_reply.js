module.exports = function (sequelize, DataTypes) {
  var TaskReply = sequelize.define(
    'TaskReply', 
    {}, 
    {
      tableName: 'tasks_replies',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          // ответ на задание привязан к посту
          TaskReply.hasOne(models.UserPost, { foreignKey: 'task_reply_id' })

          // ответ оносится к заданию
          TaskReply.belongsTo(models.TaskEntry, { foreignKey: 'task_entry_id' })

          // У цели есть доход
          TaskReply.hasOne(models.Income, { foreignKey: 'task_reply_id' })
        }
      }
    }
  )
  
  return TaskReply
}
