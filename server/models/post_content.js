export default (sequelize, DataTypes) => {
  const ContentPost = sequelize.define(
    'ContentPost',
    {
      post_id: {
        primaryKey: true,
        field: 'post_id',
        type: DataTypes.INTEGER,
        references: { model: 'posts', key: 'id' }
      },
      price: {
        defaultValue: 0,
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: 'posts_content',
      underscored: true,
      classMethods: {
        associate: (models) => {
          ContentPost.belongsTo(models.Post, { foreignKey: 'post_id' })
        }
      }
    }
  )

  return ContentPost
}