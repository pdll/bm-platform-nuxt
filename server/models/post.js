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
      },
      views: {
        defaultValue: 0,
        type: DataTypes.INTEGER
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
          // Пост отправлаяется пользователем
          Post.belongsTo(models.User, { foreignKey: 'user_id' })

          // у поста может быть множество тегов
          Post.belongsToMany(models.Tag, { foreignKey: 'post_id', as: 'Tags', through: 'tags_posts' })

          // у поста может быть множество лайков
          Post.belongsToMany(models.Like, { foreignKey: 'post_id', as: 'Likes', through: 'likes_posts' })

          // у поста может быть множество комментариев
          Post.hasMany(models.Comment, { foreignKey: 'post_id' })

          // пост может быть постом пользователя
          // Post.hasOne(models.UserPost, { foreignKey: 'post_id' })

          // либо пост может быть постом с заданием
          // Post.hasOne(models.TaskPost, { foreignKey: 'post_id' })

          // либо пост может быть постом с материалоами
          // Post.hasOne(models.ContentPost, { foreignKey: 'post_id' })

          // Множество постов могут принадлежать к множеству программ
          Post.belongsToMany(models.Program, { through: 'programs_posts', foreignKey: 'post_id' })

          // Посту может быть выставлена куча оценок
          Post.belongsToMany(models.NPS, { through: 'nps_posts', foreignKey: 'post_id', as: 'Nps' })
        }
      }
    }
  )

  return Post
}