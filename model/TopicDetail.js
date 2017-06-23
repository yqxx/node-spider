var db = require('../utils/sequelize');
var DataTypes = db.Sequelize.DataTypes;


var TopicDetail = db.sequelize.define('topicDetail', {
	id: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	sid: {
		type: DataTypes.INTEGER(11),
		allowNull: true
	},
	content: {
		type: DataTypes.TEXT,
		allowNull: true
	},
	source: {
		type: DataTypes.STRING,
		allowNull: true
	},
	title: {
		type: DataTypes.STRING,
		allowNull: true
	}
}, {
	freezeTableName: true,
	underscoredAll:true,
	timestamps: true
});

module.exports = TopicDetail;