export default (sequelize, DataTypes) => {
	const Account = sequelize.define(
    'Account', 
    {
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING, unique: true
      },
      first_name: {
        type: DataTypes.STRING
      },
      last_name: {
        type: DataTypes.STRING
      },
      birthday: {
        type: DataTypes.DATE
      },
      gender: {
        type: DataTypes.ENUM([ 'male', 'female' ])
      },
      locale: {
        type: DataTypes.STRING(12)
      },
      timezone: {
        type: DataTypes.INTEGER
      },
      remote_ip: {
        type: DataTypes.STRING
      },
      // base info here
    }, 
    {
      tableName: 'accounts',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
      underscored: true,
      classMethods: {
        associate: (models) => {
          Account.hasMany(models.User, { foreignKey: 'account_id', as: 'Users' })
          Account.hasMany(models.UserActivation, { foreignKey: 'account_id', as: 'Activations' })
        }
		  }
	  }
  )

	return Account
}
