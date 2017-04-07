export default (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
    body: {
      type: DataTypes.TEXT
    },
    score_1: {
      type: DataTypes.DOUBLE
    },
    score_2: {
      type: DataTypes.DOUBLE
    },
    score_3: {
      type: DataTypes.DOUBLE
    },
    total_score: {
      type: DataTypes.DOUBLE
    },
  }, {
    tableName: 'feedback',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    underscored: true,
    classMethods: {
      associate: (models) => {
        Feedback.belongsTo(models.User, { foreignKey: 'user_id' })
      }
    }
  })

  return Feedback
}
