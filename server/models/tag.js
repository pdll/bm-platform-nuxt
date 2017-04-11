export default (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      is_enabled: {
        defaultValue: true,
        type: DataTypes.BOOLEAN
      }
    },
    {
      tableName: 'tags',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true,
      classMethods: {
        associate: (models) => {
          // Тег принадлежит посту
          Tag.belongsToMany(models.Post, { foreignKey: 'tag_id', as: 'Posts', through: 'tags_posts' })
        }
      }
    }
  )

  return Tag
}