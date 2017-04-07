export default (sequelize, DataTypes) => {
  const TaskPost = sequelize.define(
    'TaskPost',
    {
      post_id: {
        primaryKey: true,
        field: 'post_id',
        type: DataTypes.INTEGER,
        references: { model: 'posts', key: 'id' }
      },
      start_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      finish_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      tableName: 'posts_task',
      underscored: true,
      classMethods: {
        associate: (models) => {
          TaskPost.belongsTo(models.Post, { foreignKey: 'post_id' })
          TaskPost.hasMany(models.TaskReply, { foreignKey: 'task_id' })
        }
      }
    }
  )

  return TaskPost
}