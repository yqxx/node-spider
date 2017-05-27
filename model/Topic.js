var db = require('../utils/sequelize');
var DataTypes = db.Sequelize.DataTypes;


var Topic = db.sequelize.define('topic', {
	id: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	title: {
		type: DataTypes.STRING,
		allowNull: true
	},
	info: {
		type: DataTypes.STRING,
		allowNull: true
	},
	href: {
		type: DataTypes.STRING,
		allowNull: true
	},
	img: {
		type: DataTypes.STRING,
		allowNull: true
	},
	source: {
		type: DataTypes.STRING,
		allowNull: true
	},
	sid: {
		type: DataTypes.INTEGER(11),
		allowNull: true
	},
	inside: {
		type: DataTypes.BOOLEAN,
		allowNull: true
	}
}, {
	freezeTableName: true,
	timestamps: false
});

module.exports = Topic;