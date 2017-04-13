export default (sequelize, DataTypes) => {
  const TaskEntry = sequelize.define(
    'TaskEntry',
    {
      title: {
        type: DataTypes.STRING
      },
      content: {
        type: DataTypes.TEXT
      },
      start_at: {
        type: DataTypes.DATE
      },
      finish_at: {
        type: DataTypes.DATE
      },
      is_enabled: {
        defaultValue: true,
        type: DataTypes.BOOLEAN
      }
    },
    {
      tableName: 'tasks_entries',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      classMethods: {
        associate: (models) => {
          // У задания есть автор
          TaskEntry.belongsTo(models.User, { foreignKey: 'user_id', as: 'Author' })

          // задание может быть прикреплено к программе
          TaskEntry.belongsTo(models.Program, { foreignKey: 'program_id' })

          // у задания есть прототип
          TaskEntry.belongsTo(models.Task, { foreignKey: 'task_id' })

          // у задания есть много ответов
          TaskEntry.hasMany(models.TaskReply, { foreignKey: 'task_entry_id', as: 'Replies' })
        }
      }
    }
  )

  return TaskEntry
}