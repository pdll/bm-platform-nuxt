export default (sequelize, DataTypes) => {
  const UserPost = sequelize.define(
    'UserPost',
    {
      post_id: {
        primaryKey: true,
        field: 'post_id',
        type: DataTypes.INTEGER,
        references: { model: 'posts', key: 'id' }
      },
      money_fact: {
        defaultValue: 0,
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: 'posts_user',
      underscored: true,
      classMethods: {
        associate: (models) => {
          UserPost.belongsTo(models.Post, { foreignKey: 'post_id' })
          UserPost.belongsTo(models.TaskReply, { foreignKey: 'reply_id', as: 'ReplyTo' })
        }
      }
    }
  )

  return UserPost
}