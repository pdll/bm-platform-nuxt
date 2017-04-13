export default (sequelize, DataTypes) => {
  const ProgramClass = sequelize.define(
    'ProgramClass',
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      held_at: {
        type: DataTypes.DATE
      }
    },
    {
      tableName: 'programs_classes',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          ProgramClass.belongsTo(models.Program, {
            foreignKey: {
              allowNull: false,
              field: 'program_id'
            }
          })

          // ЗАнятие может быть оценено
          ProgramClass.belongsToMany(models.NPS, { through: 'nps_classes', foreignKey: 'program_class_id', as: 'Nps' })
        }
      }
    }
  )

  return ProgramClass
}