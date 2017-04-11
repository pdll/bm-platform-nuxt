export default (sequelize, DataTypes) => {
  const FeedbackCoach = sequelize.define(
    'FeedbackCoach', 
    {}, 
    {
      tableName: 'feedback_coach',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          // feedback coach is assigned to coach
          FeedbackCoach.belongsTo(models.User, { foreignKey: 'coach_id' })
        }
      }
    }
  )

  return FeedbackCoach
}
