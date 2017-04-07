export default (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      title: {
        type: DataTypes.STRING
      },
      content: {
        type: DataTypes.TEXT
      },
      is_blocked: {
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      is_visible: {
        defaultValue: true,
        type: DataTypes.BOOLEAN
      },
      type: {
        allowNull: false,
        defaultValue: 'user',
        type: DataTypes.STRING
      }
    },
    {
      tableName: 'posts',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          Post.belongsTo(models.User, { foreignKey: 'user_id' })
          Post.hasMany(models.Tag, { foreignKey: 'post_id' })
          Post.hasMany(models.Like, { foreignKey: 'post_id' })
          Post.hasMany(models.UserPost, { foreignKey: 'post_id' })
          Post.hasMany(models.TaskPost, { foreignKey: 'post_id' })
          Post.hasMany(models.ContentPost, { foreignKey: 'post_id' })
          Post.belongsToMany(models.Program, { through: 'programs_posts', foreignKey: 'post_id' })
        }
      }
    }
  )

  return Post
}