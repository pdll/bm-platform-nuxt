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
          Program.belongsToMany(models.Post, { through: 'programs_posts', foreignKey: 'program_id' })
          Program.belongsToMany(models.User, { through: 'programs_users', foreignKey: 'program_id' })
        }
      }
    }
  )

  return Program
}