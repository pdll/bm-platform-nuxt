module.exports = function (sequelize, DataTypes) {
  var TaskVerify = sequelize.define(
    'TaskVerify', 
    {
      status: {
        defaultValue: 'assigned', 
        type: DataTypes.ENUM([ 'assigned', 'pending', 'approved', 'rejected' ])
      }
    }, 
    {
      tableName: 'tasks_verifications',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          // Проверка прицепляется к человеку
          TaskVerify.belongsTo(models.User, { foreignKey: 'user_id', as: 'Supervisor' })

          // проверка относится к ответу на задание
          TaskVerify.belongsTo(models.TaskReply, { foreignKey: 'task_reply_id' })
        }
      }
    }
  )
  
  return TaskVerify
}
