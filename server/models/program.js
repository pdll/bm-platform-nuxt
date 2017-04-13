export default (sequelize, DataTypes) => {
  const Program = sequelize.define(
    'Program',
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      alias: {
        allowNull: false,
        type: DataTypes.STRING
      },
      start_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      finish_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      is_enabled: {
        defaultValue: true,
        type: DataTypes.BOOLEAN
      }
    },
    {
      tableName: 'programs',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          // В каждой программе может быть много постов
          Program.belongsToMany(models.Post, { through: 'programs_posts', foreignKey: 'program_id' })

          // В каждой программе участвует множество человек
          Program.belongsToMany(models.User, { foreignKey: 'program_id', as: 'Users', through: models.UserProgram })

          // В программе могут быть занятия
          Program.hasMany(models.ProgramClass, { foreignKey: 'program_id', as: 'Classes' })

          // группа может принадлежать программе
          Program.hasMany(models.Group, { foreignKey: 'program_id', as: 'Groups' })

          // ПРограмме выставляют оценки
          Program.belongsToMany(models.NPS, { through: 'nps_program', foreignKey: 'program_id', as: 'Nps' })

          // в программе много заданий
          Program.hasMany(models.TaskEntry, { foreignKey: 'program_id', as: 'Tasks' })

          //
          Program.hasMany(models.UserProgramRole, { foreignKey: 'program_id' }) 
        }
      }
    }
  )

  return Program
}