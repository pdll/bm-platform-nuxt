export default (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'Task',
    {
      title: {
        type: DataTypes.STRING
      },
      content: {
        type: DataTypes.TEXT
      },
      is_enabled: {
        defaultValue: true,
        type: DataTypes.BOOLEAN
      }
    },
    {
      tableName: 'tasks',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      classMethods: {
        associate: (models) => {
          // задание имеет много тегов
          Task.belongsToMany(models.Tag, { foreignKey: 'task_id', as: 'Tags', through: 'tags_tasks' })

          Task.hasMany(models.TaskEntry, { foreignKey: 'task_id' })
        }
      }
    }
  )

  return Task
}