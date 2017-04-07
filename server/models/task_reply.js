module.exports = function (sequelize, DataTypes) {
  var TaskReply = sequelize.define(
    'TaskReply', 
    {
      status: {
        type: DataTypes.ENUM([ 'pending', 'approved', 'rejected' ])
      }
    }, 
    {
      tableName: 'task_replies',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          TaskReply.hasOne(models.UserPost, { foreignKey: 'reply_id' })
          TaskReply.belongsTo(models.User, { foreignKey: 'volunteer_id' })
        }
      }
    }
  )
  
  return TaskReply
}
