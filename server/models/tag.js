export default (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      tableName: 'tags',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true
    }
  )

  return Tag
}