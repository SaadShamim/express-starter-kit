module.exports = function(sequelize, DataTypes){
	var Profile = sequelize.define("Profile", {
    	firstname: {
    		type: DataTypes.STRING,
    		allowNull: false,
    	},
    	lastname: {
    		type: DataTypes.STRING,
    		allowNull: false,
    	},
        userId: {
            type: DataTypes.INTEGER,
            unique: true,
        }
	}, {
        classMethods: {
            associate: function(models) {
                Profile.belongsTo(models.User, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        name: 'userId',
                        allowNull: false
                    }
                })
            },
        }
    });

	return Profile;
};