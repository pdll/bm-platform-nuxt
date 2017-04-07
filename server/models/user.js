export default (sequelize, DataTypes) => {

	const User = sequelize.define(
    'User', 
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,        
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING, unique: true
      },
      uid: {
        type: DataTypes.STRING(64)
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
        type: DataTypes.STRING(8)
      },
      picture_small: {
        type: DataTypes.STRING
      },
      picture_large: {
        type: DataTypes.STRING
      },
      location_id: {
        type: DataTypes.BIGINT.UNSIGNED
      },
      location_name: {
        type: DataTypes.STRING
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
      verified: {
        type: DataTypes.BOOLEAN
      },
      waiting_list: {
        type: DataTypes.BOOLEAN
      },
      bot: {
        type: DataTypes.BOOLEAN
      },
      vesting_total: {
        type: DataTypes.DOUBLE
      },
      monets: {
        type: DataTypes.INTEGER
      },
      money_total: {
        type: DataTypes.INTEGER
      },
      polk: {
        type: DataTypes.INTEGER
      },
      posts_monets: {
        type: DataTypes.INTEGER
      },
      comments_monets: {
        type: DataTypes.INTEGER
      },
      tasks_monets: {
        type: DataTypes.INTEGER
      },
      ten: {
        type: DataTypes.INTEGER
      },
      hundred: {
        type: DataTypes.INTEGER
      },
      ten_leader: {
        type: DataTypes.BOOLEAN
      },
      hundred_leader: {
        type: DataTypes.BOOLEAN
      },
      polk_leader: {
        type: DataTypes.BOOLEAN
      },
      couch: {
        type: DataTypes.BOOLEAN
      },
      couch_group: {
        type: DataTypes.INTEGER
      },
      // current_program: {
      //   type: DataTypes.STRING
      // },
      approved_money: {
        type: DataTypes.INTEGER
      },
      // volunteer: {
      //   type: DataTypes.BOOLEAN
      // },
      target_point_a: {
        type: DataTypes.STRING
      },
      target_point_b: {
        type: DataTypes.STRING
      },
      posts_money: {
        type: DataTypes.INTEGER
      },
      tasks_money: {
        type: DataTypes.INTEGER
      },
      program_city: {
        type: DataTypes.STRING
      },
      plan: {
        type: DataTypes.INTEGER
      },
      word_price: {
        type: DataTypes.STRING
      },
      // all_programs: {
      //   type: DataTypes.BOOLEAN
      // }
    }, {
		tableName: 'users',
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		timestamps: true,
		underscored: true,
		classMethods: {
			associate: (models) => {
        User.hasMany(models.Post, { foreignKey: 'user_id' })
        User.hasMany(models.Like, { foreignKey: 'user_id' })
        User.belongsToMany(models.Program, { through: 'programs_users', foreignKey: 'user_id' })
				// User.hasMany(models.Identity);
				// User.hasMany(models.Account);
				// User.hasMany(models.Group);
        // User.hasMany(models.Game);
				// User.hasMany(models.Feedback);
			}
		}
	})

	return User
}
