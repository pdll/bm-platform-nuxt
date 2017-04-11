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
          Program.hasMany(models.User, { foreignKey: 'program_id', as: 'Users' })
        }
      }
    }
  )

  return Program
}