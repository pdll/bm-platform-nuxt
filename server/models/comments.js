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
          Comment.belongsTo(models.Post, { foreignKey: 'post_id' })
          Comment.belongsTo(models.User, { foreignKey: 'user_id' })
          Comment.belongsTo(Comment, { foreignKey: 'parent_id' })
          Comment.hasMany(Comment, { foreignKey: 'parent_id' })
        }
      }
    }
  )

  return Comment
}