export default (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
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
      }
    },
    {
      tableName: 'comments',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          // todo узнать только ли к постам могут оставляться комментарии
          // комментарий может принадлежать посту
          Comment.belongsTo(models.Post, { foreignKey: 'post_id' })

          // Комментарий оставляется пользователем
          Comment.belongsTo(models.User, { foreignKey: 'user_id' })
          
          // Комментарий может являться дочерним комментарием
          Comment.belongsTo(Comment, { foreignKey: 'parent_id' })

          // Комментарий может иметь множество дочерних коментариев
          Comment.hasMany(Comment, { foreignKey: 'parent_id' })

          // Комментарий может иметь много лайков
          Comment.belongsToMany(models.Like, { foreignKey: 'comment_id', as: 'Likes', through: 'likes_comments' })
        }
      }
    }
  )

  return Comment
}