export default (sequelize, DataTypes) => {
  const Like = sequelize.define(
    'Like',
    {},
    {
      tableName: 'likes',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          Like.belongsTo(models.Post, { foreignKey: 'post_id' })
          Like.belongsTo(models.User, { foreignKey: 'user_id' })
        }
      }
    }
  )

  return Like
}